import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET (read)
export const GET = async (request, params) => {
    try {
        await connectToDB()
        const prompts = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response ("Prompt not fuond", {status: 404})

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

// PATCH (update)
export const PATCH = async(request, {params})=>{
    const {prompt, tag } = await request.json();

    try{
       await connectToDB();
       const exisitingPrompt = await Prompt.findById(params.id);
        if(!exisitingPrompt) return new Response("Prompt not found", {status:404});
        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;
        await exisitingPrompt.save();

        return new Response(JSON.stringify(exisitingPrompt), {status:200});

    }catch(error){

    }
}

// DELETE (delete)

export const DELETE = async (request, {params})=>{
    try {

        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted sucessfully", {status:200})
        
    } catch (error) {
        return new Response("Failed to delete prompt", {status:500})
    }
}