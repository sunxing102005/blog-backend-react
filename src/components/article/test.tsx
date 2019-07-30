import "reflect-metadata";
const METHOD_METADATA = "method";
const PATH_METADATA = "path";

const Controller = (path: string): ClassDecorator => {
    return target => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
};

const createMappingDecorator = (method: string) => (
    path: string
): MethodDecorator => {
    return (target, key, descriptor) => {
        console.log("key", key);
        console.log("descriptor", descriptor);
        Reflect.defineMetadata(PATH_METADATA, path, descriptor);
        Reflect.defineMetadata(METHOD_METADATA, method, descriptor);
    };
};

const Get = createMappingDecorator("GET");
const Post = createMappingDecorator("POST");
@Controller("/test")
class SomeClass {
    @Get("/a")
    someGetMethod() {
        return "hello world";
    }

    @Post("/b")
    somePostMethod() {}
}
export default SomeClass;
