import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('creator')
        if (!prompts) return new Response('prompt not found', { status: 404 })
        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response('Falied to fetch prompts', {
            status: 500
        })
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        connectToDB();

        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response('prompt not found', { status: 404 })
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
        
    } catch (error) {
        return new Response('update failed', { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        connectToDB()
        await Prompt.findByIdAndDelete(params.id)
        return new Response('Prompt deleted', { status: 200 })
    } catch (error) {
        return new Respons('failed to delete prompt', { status: 500 })
    }
}