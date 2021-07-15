# Guide for Maintainers

classi/angular-devkit を管理する Classi 内部の開発者向けのガイドです。

## Branches

CI/CD に関連する特別なブランチは以下のものです:

- main
  - main ブランチに変更が加わるたびにすべてのパッケージで`semantic-release`に従って新しい `latest` バージョンをリリースします。
- next
  - next ブランチに変更が加わるたびにすべてのパッケージで`semantic-release`に従って新しい `next` バージョンをリリースします。

## Release

- 各パッケージのリリースは [semantic-release](https://semantic-release.gitbook.io/semantic-release/) で自動化されています。
  - monorepo 対応のため [qiwi/multi\-semantic\-release](https://github.com/qiwi/multi-semantic-release) をラッパーとして利用しています
- Conventional Commits に照らしてバージョンアップを要するコミットがあった場合、自動的に新しいバージョンが計算されリリースされます
  - リリースのための手動の作業は必要ありません
