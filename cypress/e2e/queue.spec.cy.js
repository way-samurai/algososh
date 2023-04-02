import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Корректная работа очереди', () => {
	const addNextElem = (value) => {
		cy.clock()

		cy.get('[data-cy="form"]')
			.within(() => {
				cy.get('[data-cy="input"]').type(value)
				cy.get('[data-cy="addButton"]').should('be.not.disabled')
				cy.get('[data-cy="deleteButton"]').should('be.not.disabled')
				cy.get('[data-cy="clearButton"]').should('be.not.disabled')
			})

		cy.tick(SHORT_DELAY_IN_MS)

		cy.get('[data-cy="form"]')
			.within(() => {
				cy.get('[data-cy="addButton"]').click()
				cy.get('[data-cy="deleteButton"]').should('be.disabled')
				cy.get('[data-cy="clearButton"]').should('be.disabled')
			})

		cy.get('div[class*="circle_circle"]').contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains('circle_changing')) 

		cy.tick(SHORT_DELAY_IN_MS)
	}

	const addFirstElem = (value) => {
		cy.clock()

		cy.get('[data-cy="form"]')
			.within(() => {
				cy.get('[data-cy="input"]').type(value)
				cy.get('[data-cy="addButton"]').should('be.not.disabled')
				cy.get('[data-cy="deleteButton"]').should('be.disabled')
				cy.get('[data-cy="clearButton"]').should('be.disabled')
			})

		cy.tick(SHORT_DELAY_IN_MS)

		cy.get('[data-cy="form"]')
			.within(() => {
				cy.get('[data-cy="addButton"]').click()
				cy.get('[data-cy="deleteButton"]').should('be.disabled')
				cy.get('[data-cy="clearButton"]').should('be.disabled')
			})

		cy.get('div[class*="circle_circle"]').contains(value).parent()
			.invoke('attr', 'class')
			.then((classList) => expect(classList).contains('circle_changing')) 
		cy.tick(SHORT_DELAY_IN_MS)
	}

	beforeEach(() => {
		cy.visit('http://localhost:3000');
    cy.get('[href*="/queue"]').click();
	});
	it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.get('[data-cy="form"]')
			.within(() => {
				cy.get('[data-cy="input"]').should('have.value', '')
				cy.get('[data-cy="addButton"]').should('be.disabled')
				cy.get('[data-cy="deleteButton"]').should('be.disabled')
				cy.get('[data-cy="clearButton"]').should('be.disabled')
			})
	})

	it('Добавление элемента в очередь корректно', () => {
		cy.clock()

		addFirstElem('5')

		cy.get('div[class*="circle_circle"]')
			.siblings('div').contains('head')
		cy.get('div[class*="circle_circle"]')
			.siblings('div').contains('tail')
		cy.get('div[class*="circle_circle"]')
			.siblings('p').contains('0')

		cy.tick(SHORT_DELAY_IN_MS)

		addNextElem('6')

		cy.get('div[class*="circle_circle"]')
			.contains('6').parent('div')
			.nextAll().contains('tail')
		cy.get('div[class*="circle_circle"]')
			.siblings('p').contains('1')

		cy.tick(SHORT_DELAY_IN_MS)

		addNextElem('7')
		
		cy.get('div[class*="circle_circle"]')
			.contains('7').parent('div')
			.nextAll().contains('tail')
		cy.get('div[class*="circle_circle"]')
			.siblings('p').contains('2')
	})

	it('Корректное удаления элемента из очереди', () => {
		cy.clock()
		addFirstElem('5')

		cy.tick(SHORT_DELAY_IN_MS)

		addNextElem('6')

		cy.tick(SHORT_DELAY_IN_MS)

		addNextElem('7')

		cy.tick(SHORT_DELAY_IN_MS)

		cy.get('[data-cy="form"]').within(() => {
			cy.get('[data-cy="input"]').should('have.value', '')
			cy.get('[data-cy="addButton"]').should('be.disabled')
			cy.get('[data-cy="deleteButton"]').click()
		})

		cy.tick(SHORT_DELAY_IN_MS)

		cy.get('div[class*="circle_circle"]').then((elem) => {
			cy.get(elem[0]).children().should('be.empty')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))
			cy.get(elem[1])
				.children().should('have.text', '6')

			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))
			cy.get(elem[2])
				.children().should('have.text', '7')
		})

		cy.tick()

		cy.get('[data-cy="form"]')
			.within(() => {
				cy.get('[data-cy="input"]').should('have.value', '')
				cy.get('[data-cy="addButton"]').should('be.disabled')
				cy.get('[data-cy="deleteButton"]').should('be.not.disabled')
				cy.get('[data-cy="clearButton"]').should('be.not.disabled')
			})
	})

	it('Корректное поведение кнопки «Очистить»', () => {
		cy.clock()
		addFirstElem('5')

		cy.tick(SHORT_DELAY_IN_MS)

		addNextElem('6')

		cy.tick(SHORT_DELAY_IN_MS)

		addNextElem('7')

		cy.tick(SHORT_DELAY_IN_MS)

		cy.get('[data-cy="form"]').within(() => {
			cy.get('[data-cy="input"]').should('have.value', '')
			cy.get('[data-cy="addButton"]').should('be.disabled')
			cy.get('[data-cy="clearButton"]').click()
		})

		cy.tick(SHORT_DELAY_IN_MS)

		cy.get('div[class*="circle_circle"]').children().next().should('not.exist');
		cy.tick(SHORT_DELAY_IN_MS)
		cy.get('[data-cy="form"]')
			.within(() => {
				cy.get('[data-cy="input"]').should('have.value', '')
				cy.get('[data-cy="addButton"]').should('be.disabled')
				cy.get('[data-cy="deleteButton"]').should('be.disabled')
				cy.get('[data-cy="clearButton"]').should('be.disabled')
			})
	})
}); 