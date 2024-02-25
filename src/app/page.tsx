"use client";
import TodoList from "@/app/component/TodoList";
import Image from "next/image";
import AddTodo from "./component/AddTodo";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <TodoList />
    </>
  );
}
