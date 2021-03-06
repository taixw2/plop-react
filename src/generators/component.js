'use strict';

const { getComponentTemplate, getUsedCase } = require('../utils/component.js');
const { getAddAction } = require('../utils/actions.js');
const {
  getNamePrompt,
  getTypePrompt,
  getUseReactIntlPrompt,
  getUseFlowPrompt,
} = require('../utils/prompts.js');

const getPrompts = plopConfig => {
  const prompts = [];
  prompts.push(getNamePrompt(plopConfig, 'component'));
  prompts.push(
    getTypePrompt(plopConfig, [
      'PureComponent Class',
      'Component Class',
      'Stateless Function',
    ]),
  );
  prompts.push(getUseReactIntlPrompt(plopConfig));
  prompts.push(getUseFlowPrompt(plopConfig));
  return prompts;
};

const getActions = plopConfig => data => {
  const componentTemplate = getComponentTemplate(data.type);
  const usedCase = getUsedCase(data.name);
  const actions = [];
  actions.push(
    getAddAction(
      plopConfig.componentsPath,
      usedCase,
      `{{${usedCase} name}}.component`,
      componentTemplate,
      null,
    ),
  );
  actions.push(
    getAddAction(
      plopConfig.componentsPath,
      usedCase,
      'index',
      './src/templates/index.js.hbs',
      { componentType: 'component' },
    ),
  );
  actions.push(
    getAddAction(
      plopConfig.componentsPath,
      usedCase,
      `{{${usedCase} name}}.test`,
      './src/templates/test.js.hbs',
      null,
    ),
  );
  actions.push(
    getAddAction(
      plopConfig.componentsPath,
      usedCase,
      `{{${usedCase} name}}.style`,
      './src/templates/style.js.hbs',
      null,
    ),
  );
  return actions;
};

module.exports = (plop, config) => {
  plop.setGenerator('Add an component', {
    prompts: getPrompts(config),
    actions: getActions(config),
  });
};
