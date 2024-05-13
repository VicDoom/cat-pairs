## Видео с результатами работы 5-6 спринта
https://www.loom.com/share/7741b60e60ba4e629a7ba7e8110ef4be?sid=5ccc711c-a367-4c9a-a8f1-334b5662fff3

### Пометка для ревьюеров: чтобы запустить проект, достаточно выполнить шаги 1, 2 и 4 ниже.

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```

### Миграции

Чтобы запустить миграцию для записей таблицы Emoji, нужно выполнить следующие шаги:
1. Добавить следующую переменную окружения в .env
```POSTGRES_HOST=localhost```
2. Запустить команду:
- если находитесь в корне проекта: ```yarn migrate-db```
- если находитесь в папке /server:``` npx sequelize db:migrate```

Обязательными для миграций являются следующие переменные:
- ```POSTGRES_HOST=postgresdb || localhost```
- ```POSTGRES_USER=postgres```
- ```POSTGRES_PASSWORD=postgres```
- ```POSTGRES_DB=postgres```
- ```POSTGRES_PORT=5432```

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## О проекте
[Документация](docs/README.md)
