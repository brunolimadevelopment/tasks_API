import { getRepository } from 'typeorm';
import { Tasks } from '../entity/Tasks'
import { request, Request, response, Response } from 'express'

// Método getTasks() 
export const getTasks = async (request: Request, response: Response) => {
    
    const tasks =  await getRepository(Tasks).find();

    return response.json(tasks)
};

// Método getTask()
export const getTask = async (request: Request, response: Response) => {

    const { id } = request.params
    const task = await getRepository(Tasks).findOne(id);

    return response.json(task);
};


// Método saveTask()
export const saveTask = async (request: Request, response: Response) => {

    const task = await getRepository(Tasks).save(request.body);
    
    return response.json(task)
};

// Método updateTask()
export const updateTask = async (request: Request, response: Response) => {
    
    const { id } = request.params;

    const task = await getRepository(Tasks).update(id, request.body);
    
    if (task.affected === 1) { // se for true retorne um json 
        const taskUpdated = await getRepository(Tasks).findOne(id)
        return response.json(taskUpdated);
    }

    return response.status(404).json({ message: 'Task not found!' });
};

// Método finishedTask()
export const finishedTask = async (request: Request, response: Response) => {
    const { id } = request.params;

    const task = await getRepository(Tasks).update(id, {
        finished: true
    });

    if (task.affected === 1) {
        const taskUpdated = await getRepository(Tasks).findOne(id);
        return response.json({ message: 'Task finished' });
    }

    return response.status(404).json({ message: 'Task not found!' });
};

// Método removeTask()
export const removeTask = async (request: Request, response: Response) => {
    const { id } = request.params;

    const task = await getRepository(Tasks).delete(id);

    if(task.affected === 1) {
        const taskUpdated = await getRepository(Tasks).findOne(id);
        return response.json({ message: 'Task removed!' });
    }

    return response.status(404).json({ message: 'Task not found' });
}
