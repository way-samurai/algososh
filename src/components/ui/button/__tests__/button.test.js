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

  it("Нажатие на кнопку вызывает корректный alert", () => {
    const alertText = "Успешный клик!";
    window.alert = jest.fn();

    render(<Button title={alertText} onClick={() => alert(alertText)} />);

    const button = screen.getByTitle(alertText);
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(alertText);
  });
});

