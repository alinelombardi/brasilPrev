const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const planoRoutes = require('./routes/planoRoutes');
const aporteRoutes = require('./routes/aporteRoutes');
const resgateRoutes = require('./routes/resgateRoutes');
const docsRoutes = require('./routes/docsRoutes')

const app = express();

app.use(bodyParser.json());

app.use('/cliente', clienteRoutes);
app.use('/produto', produtoRoutes);
app.use('/plano', planoRoutes);
app.use('/aporte', aporteRoutes);
app.use('/resgate', resgateRoutes);
app.use('/api-docs', docsRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
