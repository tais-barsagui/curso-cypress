/// <reference types="cypress" />

describe('Validando mensagens', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Validando mensagens do cadastro', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        cy.get('#formNome').type('Tais')

        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        
        cy.get('[data-cy=dataSobrenome]').type('DallOca')

        cy.get('#formCadastrar').click()
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        
        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
        })
})   