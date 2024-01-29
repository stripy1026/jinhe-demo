import { externalDialog } from "socialagi";
import { MentalProcess } from "soul-engine";
import { mapStream } from "./mapStream.js";
import replaceChosung from "./replaceChosung.js";
import replaceGToK from "./replaceGtoK.js";

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

  const newStream = await mapStream(stream, (str) => {
    return [...str].map((c) => replaceChosung(c)).join("");
  });
  // const newStream = await mapStream(stream, (str) => replaceGToK(str));
  speak(newStream);

  return nextStep;
};

export default gainsTrustWithTheUser;
