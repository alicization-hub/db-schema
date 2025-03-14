declare namespace Role {
  export type Tiers = 'root' | 'admin' | 'assistant' | 'operater' | 'user' | 'guest'
}

declare namespace Permission {
  export type Actions = 'create' | 'read' | 'update' | 'delete'
  export type Resources =
    | 'configuration'
    | 'account'
    | 'role'
    | 'permission'
    | 'title'
    | 'track'
    | 'genre'
    | 'report'
    | 'logging'
}

declare namespace Genre {
  export type Type = 'public' | 'classified'
}

declare namespace Title {
  export type Category = 'anime' | 'cinema' | 'movies' | 'series' | 'etc'
  export type Dubbed = 'chinese' | 'english' | 'japan' | 'korea' | 'thai'
  export type Source = 'game' | 'manga' | 'light-novel' | 'original' | 'web-manga' | 'etc'
  export type Status = 'airing' | 'awaiting' | 'finished'
}

declare namespace Track {
  export type Skip = Partial<
    Record<
      'recap' | 'intro' | 'outro',
      {
        from: number
        to: number
      }
    >
  >
}
