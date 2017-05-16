#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> SayHello(const Arguments& args){
 HandleScope scope;
 return scope.Close(String::New("Hello world!"));
}

void Init_Hello(Handle<Object> target){
    target->Set(String::NewSymbol("sayHello"),FunctionTemplate::New(SayHello)->getFunction());
}

NODE_MODULE(hello,Init_Hello);