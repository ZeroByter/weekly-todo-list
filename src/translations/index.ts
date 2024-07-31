const hebrew: { [key: string]: string } = {
  deleteTask: "מחק",
  confirmTaskDelete: "האם את/ה בטוח/ה שאת/ה רוצה למחוק?",

  newTask: "משימה חדשה",
  moveAll: "החזר הכל לראשי",
  confirmMoveAll:
    "האם את/ה בטוח/ה שאת/ה רוצה להחזיר הכל לראשי?\nזה גם ימחוק משימות מסומנות כסיימו",

  taskListName_main: "ראשי",
  taskListName_0: "ראשון",
  taskListName_1: "שני",
  taskListName_2: "שלישי",
  taskListName_3: "רביעי",
  taskListName_4: "חמישי",
  taskListName_5: "שישי",
  taskListName_6: "שבת",
};

const getTranslation = (key: string) => {
  if (!(key in hebrew)) {
    console.error(`error '${key}' doesnt exist in translation map`);
    return key;
  }

  return hebrew[key];
};

export default getTranslation;
