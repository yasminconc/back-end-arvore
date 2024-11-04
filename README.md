# 🌳 Case Árvore

<h4>Projeto desenvolvido individualmente seguindo os requesitos pedidos no desafio web full stack da Árvore,
contendo endpoints de login e cadastro</h4>

<br/>

## 📌 Link da documentação

https://documenter.getpostman.com/view/20353490/2sAY4ydzz5

<br/>

## 🛠 ferramentas e tecnologias

* Typescript
* Node.js
* Uuid
* Jwt
* Bcryptjs
* Prisma
* PostgreSql
* Express

<br/>

## ⚙️ Funcionalidades

### Cadastro

Para fazer o cadastro é necessário informar um nome, email, data de nascimento e uma senha.
Onde o Email deve ter o formato padrão, a data de nascimento deve ser menor que a data atual
e a senha deve conter no mínino 6 caracteres. A senha do usuário é automaticamente criptografada,
e ao finalizar o cadastro é retornado uma mensagem de sucesso juntamente com um token de autorização,
o token tem durabilidade de 24h.

#


### Login

Para logar um usuário é preciso passar informações de email e password, contendo tratamentos 
de erros para o email e senha. A verificação é feita através do email cadastrado anteriormente, ou seja, 
foi desenvolvido para que seja verificado se o email existe. E ao concluir o login 
é retornado uma mensagem de sucesso seguido do token do usuário.


#

* Pegar perfil do usuário
* Editar usuário
* Atualizar senha
* Deletar usuário
  
