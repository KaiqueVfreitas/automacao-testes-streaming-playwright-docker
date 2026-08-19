import { test } from '@playwright/test';
import LandingPageActions from '../pages/LandingPageActions';
import { faker } from '@faker-js/faker';

let landingPageActions;
test.beforeEach(async ({ page }) => {
   landingPageActions = new LandingPageActions (page);
});

test('deve cadastrar um lead na lista de espera', async ({ page }) => {
   let name = faker.person.fullName()
   let email = faker.internet.email()
   let alertText = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

   await landingPageActions.visit()
   await landingPageActions.openLeadModal()
   await landingPageActions.submitLeadFor(name, email)
   await landingPageActions.toastHaveText(alertText)
});

test('não deve cadastrar emails inválidos', async ({ page }) => {
   let name = faker.person.fullName()
   let email = 'testegmail.com'
   let alertText = 'Email incorreto'

   await landingPageActions.visit()
   await landingPageActions.openLeadModal()
   await landingPageActions.submitLeadFor(name, email)

   await landingPageActions.alertHaveText(alertText)
});

test('não deve cadastrar quando o nome está vazio', async ({ page }) => {
   let name = ''
   let email = faker.internet.email()
   let alertText = 'Campo obrigatório'

   await landingPageActions.visit()
   await landingPageActions.openLeadModal()
   await landingPageActions.submitLeadFor(name, email)

   await landingPageActions.alertHaveText(alertText)
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
   let name = faker.person.fullName()
   let email = ''
   let alertText = 'Campo obrigatório'

   await landingPageActions.visit()
   await landingPageActions.openLeadModal()
   await landingPageActions.submitLeadFor(name, email)

   await landingPageActions.alertHaveText(alertText)
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
   let name = ''
   let email = ''
   let alertText = ['Campo obrigatório', 'Campo obrigatório']

   await landingPageActions.visit()
   await landingPageActions.openLeadModal()
   await landingPageActions.submitLeadFor(name, email)

   await landingPageActions.alertHaveText(alertText);
});
