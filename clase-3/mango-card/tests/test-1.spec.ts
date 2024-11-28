import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://shop.mango.com/preHome.faces');

  await page.getByLabel('Access Spain (Peninsula and').click();
  
  await page.getByRole('button', { name: 'Aceptar todas' }).click();
  
  await page.getByLabel('Buscar').click();
  
  await page.getByPlaceholder('Buscar').click();
  
  await page.getByPlaceholder('Buscar').fill('C');
  
  await page.getByRole('link', { name: 'camiseta', exact: true }).click();

  await page.getByLabel('Buscar en Hombre').click();
  
  await page.getByRole('button', { name: 'M', exact: true }).first().click();

  await expect(page.getByRole('button', { name: 'Comenzar pedido' })).toBeVisible();
});