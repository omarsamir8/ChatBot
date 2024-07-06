const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "AIzaSyDSwD-qJBILwk6Z5KutY46pnrZYZgZmveA", // Replace with your actual API key
});
const openai = new OpenAIApi(configuration);
console.log(openai);

export async function sendMsgToOpenAI(message) {
  try {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return res.data.choices[0].text;
  } catch (error) {
    console.error("Error accessing OpenAI API: ", error);
    throw error;
  }
}
