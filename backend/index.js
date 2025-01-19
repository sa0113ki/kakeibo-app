const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post("/expenses", async (req, res) => {
  const { description, amount } = req.body;
  const expense = await prisma.expense.create({
    data: { description, amount },
  });
  res.json(expense);
});

app.get("/expenses", async (req, res) => {
  const expenses = await prisma.expense.findMany();
  res.json(expenses);
});

app.get("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
    });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the expense" });
  }
});

app.put("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;
  try {
    const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: { description, amount },
    });
    res.json(updatedExpense);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the expense" });
  }
});

app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.expense.delete({
      where: { id: parseInt(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the expense" });
  }
});

app.post("/incomes", async (req, res) => {
  const { description, amount } = req.body;
  const income = await prisma.income.create({
    data: { description, amount },
  });
  res.json(income);
});

app.get("/incomes", async (req, res) => {
  const incomes = await prisma.income.findMany();
  res.json(incomes);
});

app.get("/incomes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = await prisma.income.findUnique({
      where: { id: parseInt(id) },
    });
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.json(income);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the income" });
  }
});

app.put("/incomes/:id", async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;
  try {
    const updatedIncome = await prisma.income.update({
      where: { id: parseInt(id) },
      data: { description, amount },
    });
    res.json(updatedIncome);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the income" });
  }
});

app.delete("/incomes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.income.delete({
      where: { id: parseInt(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the income" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
