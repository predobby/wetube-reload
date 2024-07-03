import express from "express";
//"express"라는 패키지를 express라는 이름으로 import. 이렇게 입력하면 node_modules에서 express를 찾고 있다는 걸 알아낸다.

const PORT = 7000;

const app = express();
//express function을 사용하면, express application을 생성해준다.
//express application을 만들고 싶다면, 저렇게만 입력하면 된다.

//express application이 만들어진 다음부터, 설정을 작성해야 한다. 즉, express application생성과 listen사이에서 설정을 작성해야 한다.
//준비가 되면, application은 listen을 하기 시작하고, 외부에 개방된다.
const logger = (req, res, next) => {
  console.log(` ${req.method} ${req.url}`);
  next();
};
// next함수를 호출해야지만 middleware인 걸 알 수 있다.
// middleware는 request에 응답하지 않는다. request를 지속시켜 주는 것이다. request는 응답하는 함수가 아니라, 작업을 다음 함수에게 넘기는 함수다.

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>not allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next();
};
// url이 protected면, 경고 메시지 출력

const handleHome = (req, res) => {
  return res.send("<h1>I love middlewares</h1>");
};

app.use(logger);
//app.use는 global middleware를 만들 수 있게 해준다. 어느 url에도 작동하는 middleware말이다.
//순서가 중요한데, middleware를 use 하는 게 먼저오고, 그 다음에 url의 get이 와야 한다.
app.use(privateMiddleware);
app.get("/", handleHome);
//내 app에게 home으로 get request를 보낸다면, 반응하는 콜백

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
//보통 높은 숫자의 port들은 비어있다.
