import { injectable } from 'inversify';
import 'reflect-metadata';

export interface IJunkContext {
    name: string;
}

@injectable()
export class JunkContext implements IJunkContext {

    public name: string = 'Junk Context';
}