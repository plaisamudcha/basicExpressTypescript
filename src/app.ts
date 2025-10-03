import express, { Express } from "express";
import "dotenv/config";
import { envconfig } from "@/configs/env.config";
import { authRouter } from "@/routers/auth.router";
import { ErrorMiddleware } from "@/middlewares/error.middleware";
import {
  NotFoundMiddleware,
  notFoundMiddleware,
} from "./middlewares/not-found.middleware";

// Should we declare type of app here?
// Answer: No, TypeScript can infer the type from express()
// const app = express(); //app:Express
// app.use(express.json());

// app.use("/auth", authRouter);

// app.use(notFoundMiddleware);
// app.use(errorMiddleware);

// const port = envconfig.PORT;
// app.listen(port, () => console.log(`Server is running on port ${port}`));

// Router ===> Controller ===> Service ===> Repository (Data Access Layer)

// example code in App class
class App {
  private app: Express;

  constructor(
    private notfoundMiddleware: NotFoundMiddleware,
    private errorMiddleware: ErrorMiddleware
  ) {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureNotFound();
    this.configureErrorHandling();
  }

  configureMiddlewares() {
    this.app.use(express.json());
  }

  configureRoutes() {}

  configureNotFound() {
    this.app.use(this.notfoundMiddleware.handler);
  }

  configureErrorHandling() {
    this.app.use(this.errorMiddleware.handlerGlobalError);
    this.app.use(this.errorMiddleware.handlerBaseException);
  }

  listen(port: number) {
    this.app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
  }
}

const app = new App(new NotFoundMiddleware(), new ErrorMiddleware());
app.listen(envconfig.PORT);

// Dependency Injection and Polymorphism example {

// class A {
//   test() {
//     //old code
//   }
// }

// class A2 {
//   test() {
//     //new code
//   }

//   say() {}
// }

// class B {
//   // we should not do this
//   //   say() {
//   //     const a = new A2();
//   //     a.test();
//   //   }
//   // better to do this via dependency injection
//   constructor(private a: A) {}
//   say() {
//     this.a.test();
//   }
// }
// // we can parse A2 here although B depends on A
// // it's call polymorphism because A2 and A have same interface
// // but if A2 does not have same interface as A, it will throw error
// // A2 can have more methods than A but must have at least the methods in A
// const b = new B(new A2());
// b.say();

// class C {
//   hello() {
//     const a = new A();
//     a.test();
//   }
// }

//}
