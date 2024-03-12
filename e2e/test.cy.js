describe('Проверка посещения сайта', () => {
  it('Посещение сайта', () => {
      // Посещение указанного URL
      cy.visit('https://pro-kotikov.ru');

      // Проверка URL адреса после посещения
      cy.url().should('eq', 'https://pro-kotikov.ru/');
  });
});

//проверка посещаемости страницы на сайте 
describe('Заголовок отдельной страницы', () => {
  beforeEach(() => {
    cy.visit('https://pro-kotikov.ru/porody/ragdoll')
  })

  it('Заголовок "Рэгдолл" на экране', () => {
    cy.get('h1').should('contain.text', 'Рэгдолл') // Проверяем заголовок статьи
    cy.get('.header-article').should('be.visible') // Проверяем видимость содержимого статьи
  })
})

describe('Содержание статьи', () => {
  beforeEach(() => {
    cy.visit('https://pro-kotikov.ru/porody/ragdoll')
  })

  it('Содержание статьи должно насти "История", "Описание" и тд', () => {
    cy.get('#art-nav', { force: true }).should('exist') // Проверяем наличие блока навигации статьи, игнорируя его видимость
    cy.get('#art-nav', { force: true }).contains('История').should('exist') 
    cy.get('#art-nav', { force: true }).contains('Описание').should('exist') 
    cy.get('#art-nav', { force: true }).contains('Характер').should('exist')
    cy.get('#art-nav', { force: true }).contains('Особенности ухода').should('exist')
    cy.get('#art-nav', { force: true }).contains('Здоровье').should('exist')
  })
})

describe('Поделиться статьей', () => {
  beforeEach(() => {
    cy.visit('https://pro-kotikov.ru/porody/ragdoll')
  })

  it('Функциональность кнопки вк', () => {
    cy.get('.share-line').should('be.visible') // Проверяем видимость блока с плашками поделиться
    cy.get('.share-invite').should('contain.text', 'Понравилась статья? Поделись с друзьями!') // Проверяем текст приглашения 
    cy.get('.share-icons').should('be.visible') // Проверяем видимость блока иконок 

    // Проверяем работоспособность кнопки VK
    cy.get('.share-button.vk').should('be.visible') // Проверяем видимость кнопки VK
    cy.get('.share-button.vk').click() // Кликаем на кнопку VK
  })
})

describe('Проверка иконки', () => {
  beforeEach(() => {
    cy.visit('https://pro-kotikov.ru')
  })

  it('Наличие иконки и перенаправление на главную страницу', () => {
    cy.get('header').should('be.visible') // Проверяем видимость заголовочка
    cy.get('.cat-logo').should('be.visible') // Проверяем видимость значка
    cy.get('.cat-logo').click() // Кликаем на значок
    cy.url().should('eq', 'https://pro-kotikov.ru/') // Проверяем, что произошло перенаправление на главную страницу сайта
  })
})


describe('Наличие иконов Поиска и Навигации', () => {
  beforeEach(() => {
    cy.visit('https://pro-kotikov.ru')
  })

  it('Должны быть две иконки', () => {
    // Проверяем наличие иконок
    cy.get('.search-item').should('be.visible', { force: true }) // Проверяем видимость иконки поиска
    cy.get('.menu-icon#icon').should('be.visible', { force: true }) // Проверяем видимость иконки меню
  })
})

describe('Проверяем, что нет ссылки на сайт "https://lapkins.ru/dog/"', () => {
  beforeEach(() => {
    cy.visit('https://pro-kotikov.ru')
  })

  it('Нет ссылки на "https://lapkins.ru/dog/"', () => {
    // Проверяем, что на странице нет ссылок на https://lapkins.ru/dog/
    cy.get('a').each(($a) => {
      const href = $a.prop('href')
      expect(href).not.to.include('https://lapkins.ru/dog/')
    })
  })
})


describe('Footer кнопочки для рекламы и перехода в вк', () => {
  beforeEach(() => {
    cy.visit('https://pro-kotikov.ru')
  })

  it('Должна быть кликабельна вк и рекламодатели', () => {
    // Проверяем наличие плашек в футере
    cy.get('.footer .contact-info .social-icons .vk-icon').should('be.visible').click()

    // Проверяем наличие ссылок в футере и их кликабельность
    cy.get('.footer .contact-info .pages a[href="/kontakty"]').should('be.visible').click()
    cy.url().should('include', '/kontakty') // Проверяем URL после клика на ссылку "Контакты"

    cy.visit('https://pro-kotikov.ru') // Возвращаемся на главную страницу перед проверкой следующей ссылки

    cy.get('.footer .contact-info .pages a[href="/reklama"]').should('be.visible').click()
    cy.url().should('include', '/reklama') // Проверяем URL после клика на ссылку "Для рекламодателей"
  })
})


//для наличия ошибки (такой ссылки там нема)
import 'cypress-xpath'

describe('Проверяем наличие ссылки на собачий сайт на сайте "https://pro-kotikov.ru"', () => {
  it('Ссылка "https://lapkins.ru/dog/" должна быть на сайте "https://pro-kotikov.ru"', () => {
    cy.visit('https://pro-kotikov.ru')

    // Ищем ссылку "https://lapkins.ru/dog/" с помощью XPath
    cy.xpath('//a[@href="https://lapkins.ru/dog/"]').should('exist').then(($link) => {
      // Если ссылка не найдена, выдаем ошибку
      if ($link.length === 0) {
        throw new Error('Ссылка на https://lapkins.ru/dog/ не найдена на сайте')
      }
    })
  })
})

