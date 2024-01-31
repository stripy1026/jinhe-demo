import { externalDialog } from "socialagi";
import { MentalProcess } from "soul-engine";
import replaceChosung from "./replaceChosung.js";

const gainsTrustWithTheUser: MentalProcess = async ({
  step: initialStep,
  subroutine: { useActions },
}) => {
  const { speak } = useActions();

  const { stream, nextStep } = await initialStep.next(
    externalDialog(
      "Talk to the user trying to gain trust and learn about their inner world."
    ),
    { stream: true, model: "quality" }
  );

  async function* transformStream(
    it: AsyncIterable<string>,
    callback: (char: string) => string
  ) {
    for await (let chunk of it) {
      yield [...chunk].map(callback).join("");
    }
  }
  speak(transformStream(stream, replaceChosung));

  return nextStep;
};

export default gainsTrustWithTheUser;
