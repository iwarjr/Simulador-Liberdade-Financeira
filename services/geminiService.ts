import { GoogleGenAI } from "@google/genai";
import { UserInputState } from "../types";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found in environment variables");
    }
    return new GoogleGenAI({ apiKey });
};

/**
 * Generates the "Perfect Prompt" based on user inputs.
 * It acts as a meta-prompter.
 */
export const generateOptimizedPrompt = async (inputs: UserInputState): Promise<string> => {
    const ai = getClient();
    
    // Constructing the meta-prompt
    const metaPrompt = `
    Atue como um Especialista Mundial em Engenharia de Prompts (Prompt Engineer).
    Sua tarefa é escrever um prompt altamente otimizado, estruturado e eficaz para ser enviado a uma LLM (como o Gemini ou GPT-4).

    DADOS DO USUÁRIO:
    1. Ideia Central: "${inputs.idea}"
    2. Persona/Agente: "${inputs.agent?.label}" (${inputs.agent?.description})
    3. Objetivo Final: "${inputs.goal?.label}" (${inputs.goal?.description})
    4. Público Alvo: "${inputs.audience}"
    5. Tom de Voz: "${inputs.tone}"
    6. Idioma de Saída: "${inputs.language}"

    INSTRUÇÕES:
    - Escreva o prompt na primeira pessoa (como se a IA fosse a persona).
    - Use técnicas avançadas como "Chain of Thought" (instrua a IA a pensar passo a passo) se for complexo.
    - Defina claramente o formato de saída.
    - Inclua restrições e guias de estilo baseados no Tom e Público.
    - O resultado deve ser APENAS o texto do prompt otimizado, sem introduções ou explicações fora do prompt.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: metaPrompt,
        });
        
        return response.text || "Não foi possível gerar o prompt. Tente novamente.";
    } catch (error) {
        console.error("Error generating optimized prompt:", error);
        throw error;
    }
};

/**
 * Executes the generated prompt to show the user a preview of the result.
 */
export const executePrompt = async (prompt: string): Promise<string> => {
    const ai = getClient();

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Sem resposta da IA.";
    } catch (error) {
        console.error("Error executing prompt:", error);
        return "Erro ao executar o prompt gerado.";
    }
};
