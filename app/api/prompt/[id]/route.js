import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found", {status: 400})

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

//PATH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!prompt) return new Response("Prompt not found", { status: 400 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        console.error('Error updating prompt:', error);
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    console.log('Params ID:', params.id); // Log to check the value
    try {
        await connectToDB();

        // Find and delete the prompt by ID 
        const prompt = await Prompt.findByIdAndRemove(params.id);

        if (!prompt) {
            return new Response('Prompt not found', { status: 404 });
          }

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error('Error deleting prompt:', error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
}