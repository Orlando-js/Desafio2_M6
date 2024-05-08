const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      formatearNumber: function (numberString) {
        return (+numberString).toLocaleString();
      },
      primeraMayuscula: function (texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      },
      boldHeroTitle: function (options) {
        return '<h1 class="fw-bold">' + options.fn(this) + "</h1>";
      },
    },
  })
);

app.set("view engine", ".hbs");
app.set("views", "./views");

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

app.use("/bootstrap_css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/bootstrap_js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/public", express.static("./public"));

const datos = [
  { articulo: "banana", precio: "1350", medida: "1", unidad: "kg" },
  { articulo: "cebollas", precio: "990", medida: "1", unidad: "unidad" },
  { articulo: "lechuga", precio: "1090", medida: "1", unidad: "unidad" },
  { articulo: "papas", precio: "2690", medida: "2", unidad: "kg" },
  { articulo: "pimenton", precio: "1250", medida: "1", unidad: "unidad" },
  { articulo: "tomate", precio: "1950", medida: "1", unidad: "kg" },
];

app.get("/", (req, res) => {
  res.render("inicio", { datos });
});
