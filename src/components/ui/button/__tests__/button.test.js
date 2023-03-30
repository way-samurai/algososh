import { render, screen, fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { Direction } from "../../../../types/direction";
import { Button } from "../button";

describe("Тестирование компонента Button", () => {
  it("Корректно отрисовывается кнопка с текстом", () => {
    const button = TestRenderer.create(<Button text="Текст" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректно отрисовывается кнопка без текста", () => {
    const button = TestRenderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректно отрисовывается заблокированная кнопка", () => {
    const button = TestRenderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректно отрисовывается кнопка с индикацией загрузки", () => {
    const button = TestRenderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректно отрисовывается кнопка с сортировкой по возрастанию", () => {
    const button = TestRenderer.create(
      <Button sorting={Direction.Ascending} />
    ).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректно отрисовывается кнопка с сортировкой по убыванию", () => {
    const button = TestRenderer.create(
      <Button sorting={Direction.Descending} />
    ).toJSON();
    expect(button).toMatchSnapshot();
  });

  // it("Нажатие на кнопку вызывает корректный alert", () => {
  //   window.alert = jest.fn;
  //   render(<Button title="Проверка срабатывания по клику кнопки" />);
  //   const title = screen.getByText("Проверка срабатывания по клику кнопки");
  //   fireEvent.click(title);
  //   expect(window.alert).toHaveBeenCalledWith(
  //     "Проверка срабатывания по клику кнопки"
  //   );
  // });
});

// Проверяем при помощи снэпшотов корректную отрисовку:
// кнопки с текстом;
// кнопки без текста;
// заблокированной кнопки;
// кнопки с индикацией загрузки.
// Проверяем корректность вызова колбека при клике на кнопку.
