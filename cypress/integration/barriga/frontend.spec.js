/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'


describe('Testes no site Barriga React', () => {
    before(() => {
             
        cy.login('dallocatais@gmail.com', 'senha errada')
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click
        //cy.resetApp()
    })

    it('Inserir conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Alterar conta', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
     })

     it('Não deve criar uma conta com o mesmo nome', () => {
        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
     })

     it('Inserindo movimentação', () => {
         cy.get(loc.MENU.MOVIMENTACAO).click()

         cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
         cy.get(loc.MOVIMENTACAO.VALOR).type('200')
         cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
         cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
         cy.get(loc.MOVIMENTACAO.STATUS).click()
         cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
         cy.get(loc.MESSAGE).should('contain', 'sucesso')

         cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
         cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '200')).should('exist')
        })

        it('Deve pegar o saldo', () => {
            
            cy.get(loc.MENU.HOME).click()
            cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo'))
                .should('contain', '534,00')

            cy.get(loc.MENU.EXTRATO).click()
            cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_MOVIMENTACAO('Movimentacao 1, calculo saldo')).click()
            //cy.wait(1000)
            cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
            cy.get(loc.MOVIMENTACAO.STATUS).click()
            cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
            cy.get(loc.MESSAGE).should('contain', 'sucesso')

            cy.get(loc.MENU.HOME).click()
            cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo'))
                .should('contain', '534,00')

        })

        it('Deve remover uma movimentação', () => {
            cy.get(loc.MENU.EXTRATO).click()
            cy.xpath(loc.EXTRATO.FN_XP_REMOVE_MOVIMENTACAO('Movimentacao para exclusao')).click()
            cy.get(loc.MESSAGE).should('contain', 'sucesso')

        })
})