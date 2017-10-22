# Swagger 2.0 - fetch client generator

A fast coded fetch client generator for swagger specification.

An example of generated code is available in `generated` folder.

The idea behind this project was to quickly write a client for a dedicated specification
 in a faster way than writing it by hand or modifying result from the [official generator](https://github.com/swagger-api/swagger-codegen).

**WARNING : This code isn't intended to be use as is. 
It has only been *manually* tested among few different specifications**

## Usage

```
java -jar -Dspec=http://petstore.swagger.io/v2/swagger.json quick-swagger-client-generator.jar [typescript]
```