# Repositório para o desafio da Take!
O objetivo do desafio técnico é fazer uma API intermediária que consuma os dados da API do GitHub de forma a selecionar dados específicos de 5 repositórios mais antigos com a linguagem C# do perfil da empresa na plataforma.

## Estrutura de arquivos
Este mini-projeto possui arquivos de front-end (pasta `client`) que simulam um chat que conecta com o bot criado na plataforma da Take.Blip. Os arquivos que rodam no NodeJS se encontram na pasta `server`. Os arquivos de front-end foram tirados e adaptados dos exemplos do repositório do SDK Blip e estão para fins de ilustração do bot.

## Instruções
Clone o repositório e rode o arquivo `server/app.js` no servidor. Em seguida, faça uma requisição (GET) para endpoint /api, no host local, porta (3003) com um JSON no corpo da mensagem, no padrão abaixo:
`{
    "type": "text/plain",
    "content": "Hello, robot",
    "to": "553199990000@0mn.io"
}`
