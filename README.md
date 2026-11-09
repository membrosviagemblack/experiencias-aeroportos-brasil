# Guia dos Membros Viagem Black — Airport Experience Brasil

## Publicação
Envie `index.html` para a raiz do repositório GitHub Pages, substituindo o arquivo anterior.

## Funcionalidades incluídas
- Tema claro/escuro com preferência salva no navegador.
- Seletor de aeroporto personalizado: abre, fecha ao selecionar, ao clicar fora ou pressionar Esc.
- Nomes completos dos aeroportos com códigos IATA.
- Atalhos em botões IATA para filtrar diretamente. Um segundo clique no mesmo código limpa o filtro.
- Área administrativa para cadastrar, editar e excluir experiências personalizadas e administrar logins locais.

## Limitação importante da administração
Este projeto é uma página estática do GitHub Pages. Os cadastros e administradores usam `localStorage` do navegador: ficam somente no dispositivo/navegador onde foram criados e não atualizam os dados públicos para os demais visitantes. O hash de senha e a tela de login no HTML estático não equivalem a autenticação segura de servidor. Para administração compartilhada e segura é necessário backend com autenticação e banco de dados.

## Dados
Os registros originais foram mantidos incorporados ao HTML fornecido como base.
