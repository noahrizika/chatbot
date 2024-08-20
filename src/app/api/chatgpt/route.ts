import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const apiKey: string | undefined = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    'The OPENAI_API_KEY environment variable is missing or empty.'
  );
}

const client = new OpenAI({
  apiKey: apiKey,
});

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      content: string;
    }>
  | NextResponse<{
      error: Error;
    }>
> {
  try {
    const { userInput } = await req.json();

    const chatBotPrompt = `You will help people find academic researchers. Users will input a subject field,
                            and you will return with the names, contact information and employer of researchers
                            who study that field. Find researchers who specialize in that field. Only if you
                            can't find enough researchers studying that specific field, then provide researchers
                            who are mostly studying that field. When providing contact information, if you cannot
                            find their email or phone number, use their employer's contact information (ie: their
                            university's relevant department's contact information).

                            Do not output if their name is John Smith, John Doe, Jane Smith, or Jane Doe.
                            Do not output any questions or follow up statements. Do not prompt the user to respond.

                            You will output in this format:
                            **<1>**
                            *Name:* <Researcher's Full Name>
                            *Field of Study:* <Researcher's Academic Field of Study>
                            *Employer:* <Researcher's Employer>
                            *Contact Information:* <Researcher's Email or Phone Number>
                            `;

    const completion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: chatBotPrompt,
          },
          {
            role: 'user',
            content: userInput,
          },
        ],
      });

    const response = completion.choices[0]
      .message as OpenAI.Chat.Completions.ChatCompletionMessage;

    if (!response.content) {
      throw new Error('Received null or undefined content from the API');
    }

    return NextResponse.json({ content: response.content });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error }, { status: 500 });
    } else {
      return NextResponse.json(
        {
          error: new Error('An unknown error occurred in chatgpt POST request'),
        },
        { status: 500 }
      );
    }
  }
}
