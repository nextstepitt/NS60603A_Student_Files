// file inversify.config.ts

import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import InjectableTypes from "../data-access/InjectableTypes";
import { IJunkContext, JunkContext } from '../data-access/JunkContext'

const inversifyContainer = new Container();
inversifyContainer.bind<JunkContext>(InjectableTypes.Context).toSelf();

const { lazyInject } = getDecorators(inversifyContainer);

console.log('inversify.config.ts', inversifyContainer)

export default inversifyContainer;
export { lazyInject };