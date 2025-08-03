const logger = require("./utils/logger");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const contactsRouter = require("./controllers/contacts");
const errorHandler = require("./handlers/error");

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use("/api/persons", contactsRouter);


morgan.token("body", (req) => {
    return JSON.stringify(req.body);
});


const PORT = process.env.PORT || 3001;


// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});