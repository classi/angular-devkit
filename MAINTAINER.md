# Guide for Maintainers

classi/angular-devkit を管理する Classi 内部の開発者向けのガイドです。

## Branches

CI/CD に関連する特別なブランチは以下のものです:

### main

- main ブランチに変更が加わるたびにすべてのパッケージで`@next`バージョンをリリースします。
  - [.github/workflows/publish-next.yml](https://github.com/classi/angular-devkit/blob/main/.github/workflows/publish-next.yml)

## Release

各パッケージの `@latest`バージョンのリリースは [.github/workflows/publish-latest.yml](https://github.com/classi/angular-devkit/blob/main/.github/workflows/publish-latest.yml) で自動化されています。対象パッケージのリリース用 Git タグを付与して Push するとリリースワークフローがトリガーされます。

1. 最新の main ブランチをローカルに pull する
2. リリースしたいパッケージに対して `yarn release <projectName>` コマンドを実行する
   - 例: `yarn release google-analytics`
   - (推奨) `yarn release google-analytics --dry-run` を実行して `CHANGELOG.md` の変更内容を事前に確認する
3. `git push --follow-tags origin main` を実行する
   - 特定のタグをトリガーとして GitHub Actions のワークフローがトリガーされます
