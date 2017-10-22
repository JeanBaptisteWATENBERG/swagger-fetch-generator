package com.poc.jb;

import io.swagger.models.HttpMethod;
import io.swagger.models.Model;
import io.swagger.models.Path;
import io.swagger.models.Swagger;
import io.swagger.models.parameters.BodyParameter;
import io.swagger.models.parameters.Parameter;
import io.swagger.parser.SwaggerParser;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * @author jeanbaptiste.watenberg@gmail.com
 */
public class Main {
    public static void main(String[] args) throws IOException {
        String spec = System.getProperty("spec", "http://petstore.swagger.io/v2/swagger.json");
        Swagger swagger = new SwaggerParser().read(spec);

        boolean _typescript = false;
        if (args.length > 0 && args[0].equals("typescript")) {
            _typescript = true;
        }

        final boolean typescript = _typescript;

        String title = swagger.getInfo().getTitle();
        String api = transformStringToUpperCamelCase(title);
        String outputFolder = "./generated/" + Instant.now().toString() + "/";
        if (new File(outputFolder).mkdirs()) {
            String outputPathname = outputFolder + api + ".js";
            File file = new File(outputPathname);
            if (file.createNewFile()) {
                PrintStream printStream = new PrintStream(file);
                printStream.append("export default class ").append(api)
                        .println(" {");

                if (typescript) {
                    printStream.append("\n\n\tprivate basePath: string;");
                }

                String basePath = ((swagger.getSchemes().contains("https"))?"https://":"http://") +
                        swagger.getHost() + swagger.getBasePath();
                if (typescript) {
                    printStream.append("\n\n\tconstructor(basePath: string) {\n");
                } else {
                    printStream.append("\n\n\tconstructor(basePath) {\n");
                }
                printStream
                        .append("\t\tthis.basePath = basePath.replace(/\\/+$/, '') || '").append(basePath)
                        .append("';\n\t}\n\n");

                Map<String, Path> paths = swagger.getPaths();
                paths.forEach((pathURI, path) -> {
                    path.getOperationMap().forEach((httpMethod, operation) -> {
                        String summary = operation.getSummary();
                        String httpVerb = httpMethod.name();
                        String operationName = transformStringToLowerCamelCase(summary).replaceAll("\\.$", "");

                        final String[] pathUrl = {pathURI};

                        printStream.append("\t/**\n\t * ").append(operation.getDescription().replace("\n", "\n\t * ")).append("\n\t**/\n");
                        printStream.append("\tasync ").append(operationName).append("(");

                        final boolean[] isFirstParam = {true};
                        final boolean[] isFirstQueryParam = {true};
                        StringBuilder requiredParamsValidators = new StringBuilder();
                        StringBuilder headers = new StringBuilder();
                        StringBuilder queryParams = new StringBuilder();
                        List<Parameter> parameters = operation.getParameters();
                        if (operation.getSecurity() != null && operation.getSecurity().size() > 0) {
                            isFirstParam[0] = false;
                            String name = "securityToken";
                            printStream.append(name);
                            if (typescript) {
                                printStream.append(": string");
                            }
                            buildAndAppendRequiredParam(name, summary.replaceAll("\\.$", ""), requiredParamsValidators);
                            headers.append("\t\tconst headers = new Headers();\n\t\theaders.append('Accept', 'application/json');\n")
                                    .append("\t\theaders.append('Authorization', `Bearer ${securityToken}`);\n")
                                    .append("\t\theaders.append('Content-Type', 'application/json');\n");
                        }
                        final String[] bodyParam = new String[1];
                        if (parameters != null) {
                            parameters.forEach(parameter -> {
                                boolean required = parameter.getRequired();
                                String name = transformStringToLowerCamelCase(parameter.getName());
                                if (parameter.getIn().equalsIgnoreCase("path")) {
                                    pathUrl[0] = pathUrl[0].replace("{" + parameter.getName() + "}", "${" + name + "}");
                                } else if (parameter.getIn().equalsIgnoreCase("query")) {
                                    if (isFirstQueryParam[0]) {
                                        queryParams.append("\t\tconst queryParams = [];\n");
                                    }
                                    isFirstQueryParam[0] = false;
                                    queryParams.append("\t\tqueryParams.push({name: '")
                                            .append(name)
                                            .append("', value:")
                                            .append(name)
                                            .append("});\n");
                                }
                                if (!isFirstParam[0]) {
                                    printStream.append(", ");
                                }
                                isFirstParam[0] = false;
                                printStream.append(name);

                                if (typescript) {
                                    printStream.append(name + ": any");
                                }

                                if (required) {
                                    buildAndAppendRequiredParam(name, summary.replaceAll("\\.$", ""), requiredParamsValidators);
                                }

                                if (parameter.getIn().equalsIgnoreCase("body")) {
                                    bodyParam[0] = name;
                                    BodyParameter bodyParameter = (BodyParameter) parameter;
                                    Model schema = bodyParameter.getSchema();
                                    if (schema.getReference() != null && !schema.getReference().isEmpty() && schema.getProperties() == null) {
                                        schema = swagger.getDefinitions().get(schema.getReference().replace("#/definitions/", ""));
                                    }
                                    if (schema != null && schema.getProperties() != null) {
                                        schema.getProperties().forEach((propName, property) -> {
                                            if (property.getRequired()) {
                                                buildAndAppendRequiredParam(
                                                        name + "['" + propName + "']", summary.replaceAll("\\.$", ""),
                                                        String.valueOf(property.getExample()), requiredParamsValidators);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        printStream.println(") {");
                        printStream.append(requiredParamsValidators)
                                .append(headers).append("\n")
                                .append(queryParams).append("\n");

                        if (queryParams.toString().length()>0) {
                            printStream.append(
                                    "\n\t\tconst queryParamsString = queryParams.map((param) => {\n" +
                                    "\t\t\tif (param.value) {\n" +
                                    "\t\t\t\treturn `${param.name}=${param.value}`;\n" +
                                    "\t\t\t} else {\n" +
                                    "\t\t\t\treturn null;\n" +
                                    "\t\t\t}\n" +
                                    "\t\t}).filter((param) => param !== null)\n" +
                                    "\t\t.reduce((accumulator, param) => accumulator + param);\n\n");
                        }

                        printStream
                                .append("\t\tconst request = new Request(this.basePath + `").append(pathUrl[0]);

                        if (queryParams.toString().length()>0) {
                            printStream.append("${queryParamsString.length>0?`?${queryParamsString}`:''}");
                        }

                        printStream
                                .append("`,\n")
                                .append("\t\t\t{\n")
                                .append("\t\t\t\theaders: headers,\n")
                                .append("\t\t\t\tmethod: '").append(httpVerb).append("',\n")
                                .append("\t\t\t\tcredentials: 'include'");

                        if ((httpMethod == HttpMethod.POST || httpMethod == HttpMethod.PATCH || httpMethod == HttpMethod.PUT) && (bodyParam[0]!= null && !bodyParam[0].equalsIgnoreCase(""))) {
                            printStream.append(",\n")
                                    .append("\t\t\t\tbody: JSON.stringify(").append(bodyParam[0]).append(")");
                        }

                        printStream.append("\n\t\t\t});\n\n")
                                .append("\t\treturn await fetch(request).then(response => response.json());\n")
                                .append("\t}\n\n");
                    });
                });
                printStream.append("}");
                System.out.println((char) 27 + "[32mClient successfully generated and available at " + outputPathname + (char) 27 + "[0m");
            }
        }
    }

    private static StringBuilder buildAndAppendRequiredParam(String name, String summary, StringBuilder requiredParamsValidators) {
        return requiredParamsValidators
                .append("\t\t")
                .append("if (!")
                .append(name)
                .append(" || ")
                .append(name)
                .append(" == '') {\n")
                .append("\t\t\t")
                .append("throw new Error('")
                .append(summary.replace("'", "\\'"))
                .append(" requires [")
                .append(name.replace("'", "\\'"))
                .append("] parameter');\n")
                .append("\t\t}\n");
    }

    private static StringBuilder buildAndAppendRequiredParam(String name, String summary, String exampleValue, StringBuilder requiredParamsValidators) {
        return requiredParamsValidators
                .append("\t\t")
                .append("if (!")
                .append(name)
                .append(" || ")
                .append(name)
                .append(" == '') {\n")
                .append("\t\t\t")
                .append("throw new Error('")
                .append(summary.replace("'", "\\'"))
                .append(" requires [")
                .append(name.replace("'", "\\'"))
                .append("] parameter. An example value is [").append(exampleValue).append("]');\n")
                .append("\t\t}\n");
    }

    private static String transformToCamelCase(String originalString, boolean isUpperCamelCase) {
        if (originalString==null)
            return null;

        final StringBuilder ret = new StringBuilder(originalString.length());

        int endIndex = originalString.indexOf("(");
        if (endIndex != -1) {
            originalString = originalString.substring(0, endIndex);
        }
        for (final String word : originalString.split(" |_")) {
            if (!word.isEmpty()) {
                if (ret.length() == 0 && !isUpperCamelCase) {
                    ret.append(word.substring(0, 1).toLowerCase());
                } else {
                    ret.append(word.substring(0, 1).toUpperCase());
                }
                ret.append(word.substring(1).toLowerCase());
            }
        }

        return ret.toString();
    }

    private static String transformStringToLowerCamelCase(String originalString) {
        return transformToCamelCase(originalString, false);
    }

    private static String transformStringToUpperCamelCase(String originalString) {
        return transformToCamelCase(originalString, true);
    }
}
