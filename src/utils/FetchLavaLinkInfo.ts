type LavalinkInfo = {
  nodes: ({
    _id: string;
    host: string;
    identifier: string;
    owner: {
      _id: string;
      discordId: string;
      __v: number;
      avatar: null;
      createdAt: string;
      discriminator: string;
      nodes: string[];
      updatedAt: string;
      username: string;
      buffer?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: {
      timestamp: string;
      online: boolean;
      responseTime: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    connections: {
      players: number;
      playingPlayers: number;
    };
    cpu: {
      cores: number;
      systemLoad: number;
      lavalinkLoad: number;
    };
    info: {
      version: {
        semver: string;
        major: number;
        minor: number;
        patch: number;
        preRelease: string;
        _id: string;
      };
      buildTime: number;
      git: {
        branch: string;
        commit: string;
        commitTime: number;
      };
      jvm: string;
      lavaplayer: string;
      sourceManagers: string[];
      filters: string[];
      plugins: {
        name: string;
        version: string;
        _id: string;
      }[];
    };
    memory: {
      free: number;
      used: number;
      allocated: number;
      reservable: number;
    };
    uptime: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
  } | {
    _id: string;
    host: string;
    identifier: string;
    owner: {
      _id: string;
      discordId: string;
      __v: number;
      avatar: string;
      createdAt: string;
      discriminator: string;
      nodes: string[];
      updatedAt: string;
      username: string;
      buffer?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: {
      timestamp: string;
      online: boolean;
      responseTime: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
    connections?: undefined;
    cpu?: undefined;
    info?: undefined;
    memory?: undefined;
    uptime?: undefined;
  } | {
    _id: string;
    host: string;
    identifier: string;
    owner: {
      _id: string;
      discordId: string;
      __v: number;
      avatar: string;
      createdAt: string;
      discriminator: string;
      nodes: string[];
      updatedAt: string;
      username: string;
      buffer?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: {
      timestamp: string;
      online: boolean;
      responseTime: number;
      stats: {
        players: number;
        playingPlayers: number;
        uptime: number;
        cpu: {
          cores: number;
          systemLoad: number;
          lavalinkLoad: number;
        };
        memory: {
          free: number;
          used: number;
          allocated: number;
          reservable: number;
        };
      };
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    connections: {
      players?: undefined;
      playingPlayers?: undefined;
    };
    cpu: {
      cores: number;
      systemLoad: number;
      lavalinkLoad: number;
    };
    info: {
      version: {
        semver: string;
        major: number;
        minor: number;
        patch: number;
        preRelease: string;
        _id: string;
      };
      buildTime: number;
      git: {
        branch: string;
        commit: string;
        commitTime: number;
      };
      jvm: string;
      lavaplayer: string;
      sourceManagers: string[];
      filters: string[];
      plugins: never[];
    };
    memory: {
      free: number;
      used: number;
      allocated: number;
      reservable: number;
    };
    uptime: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
  } | {
    _id: string;
    host: string;
    identifier: string;
    owner: {
      _id: string;
      discordId: string;
      __v: number;
      avatar: string;
      createdAt: string;
      discriminator: string;
      nodes: string[];
      updatedAt: string;
      username: string;
      buffer?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: ({
      timestamp: string;
      online: boolean;
      responseTime: number;
      stats: {
        players: number;
        playingPlayers: number;
        uptime: number;
        cpu: {
          cores: number;
          systemLoad: number;
          lavalinkLoad: number;
        };
        memory: {
          free: number;
          used: number;
          allocated: number;
          reservable: number;
        };
      };
    } | {
      timestamp: string;
      online: boolean;
      responseTime: number;
      stats?: undefined;
    })[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    connections: {
      players: number;
      playingPlayers: number;
    };
    cpu: {
      cores: number;
      systemLoad: number;
      lavalinkLoad: number;
    };
    info: {
      version: {
        semver: string;
        major: number;
        minor: number;
        patch: number;
        preRelease: string;
        _id: string;
      };
      buildTime: number;
      git: {
        branch: string;
        commit: string;
        commitTime: number;
      };
      jvm: string;
      lavaplayer: string;
      sourceManagers: string[];
      filters: string[];
      plugins: {
        name: string;
        version: string;
        _id: string;
      }[];
    };
    memory: {
      free: number;
      used: number;
      allocated: number;
      reservable: number;
    };
    uptime: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
  } | {
    _id: string;
    host: string;
    identifier: string;
    owner: {
      buffer: {
        "0": number;
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        "6": number;
        "7": number;
        "8": number;
        "9": number;
        "10": number;
        "11": number;
      };
      _id?: undefined;
      discordId?: undefined;
      __v?: undefined;
      avatar?: undefined;
      createdAt?: undefined;
      discriminator?: undefined;
      nodes?: undefined;
      updatedAt?: undefined;
      username?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: ({
      timestamp: string;
      online: boolean;
      responseTime: number;
      stats?: undefined;
    } | {
      timestamp: string;
      online: boolean;
      responseTime: number;
      stats: {
        players: number;
        playingPlayers: number;
        uptime: number;
        cpu: {
          cores: number;
          systemLoad: number;
          lavalinkLoad: number;
        };
        memory: {
          free: number;
          used: number;
          allocated: number;
          reservable: number;
        };
      };
    })[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    connections: {
      players: number;
      playingPlayers: number;
    };
    cpu: {
      cores: number;
      systemLoad: number;
      lavalinkLoad: number;
    };
    info: {
      version: {
        semver: string;
        major: number;
        minor: number;
        patch: number;
        preRelease: string;
        _id: string;
      };
      buildTime: number;
      git: {
        branch: string;
        commit: string;
        commitTime: number;
      };
      jvm: string;
      lavaplayer: string;
      sourceManagers: string[];
      filters: string[];
      plugins: {
        name: string;
        version: string;
        _id: string;
      }[];
    };
    memory: {
      free: number;
      used: number;
      allocated: number;
      reservable: number;
    };
    uptime: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
  } | {
    _id: string;
    host: string;
    identifier: string;
    owner: {
      _id: string;
      discordId: string;
      __v: number;
      avatar: string;
      createdAt: string;
      discriminator: string;
      nodes: string[];
      updatedAt: string;
      username: string;
      buffer?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: ({
      timestamp: string;
      online: boolean;
      responseTime: number;
      stats: {
        players: number;
        playingPlayers: number;
        uptime: number;
        cpu: {
          cores: number;
          systemLoad: number;
          lavalinkLoad: number;
        };
        memory: {
          free: number;
          used: number;
          allocated: number;
          reservable: number;
        };
      };
    } | {
      timestamp: string;
      online: boolean;
      responseTime: number;
      stats?: undefined;
    })[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    connections: {
      players: number;
      playingPlayers: number;
    };
    cpu: {
      cores: number;
      systemLoad: number;
      lavalinkLoad: number;
    };
    info: {
      version: {
        semver: string;
        major: number;
        minor: number;
        patch: number;
        preRelease: null;
        _id: string;
      };
      buildTime: number;
      git: {
        branch: string;
        commit: string;
        commitTime: number;
      };
      jvm: string;
      lavaplayer: string;
      sourceManagers: string[];
      filters: string[];
      plugins: {
        name: string;
        version: string;
        _id: string;
      }[];
    };
    memory: {
      free: number;
      used: number;
      allocated: number;
      reservable: number;
    };
    uptime: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
  } | {
    _id: string;
    host: string;
    identifier: string;
    owner: {
      buffer: {
        "0": number;
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        "6": number;
        "7": number;
        "8": number;
        "9": number;
        "10": number;
        "11": number;
      };
      _id?: undefined;
      discordId?: undefined;
      __v?: undefined;
      avatar?: undefined;
      createdAt?: undefined;
      discriminator?: undefined;
      nodes?: undefined;
      updatedAt?: undefined;
      username?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: {
      timestamp: string;
      online: boolean;
      responseTime: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    connections: {
      players: number;
      playingPlayers: number;
    };
    cpu: {
      cores: number;
      systemLoad: number;
      lavalinkLoad: number;
    };
    info: {
      version: {
        semver: string;
        major: number;
        minor: number;
        patch: number;
        preRelease: null;
        _id: string;
      };
      buildTime: number;
      git: {
        branch: string;
        commit: string;
        commitTime: number;
      };
      jvm: string;
      lavaplayer: string;
      sourceManagers: string[];
      filters: string[];
      plugins: {
        name: string;
        version: string;
        _id: string;
      }[];
    };
    memory: {
      free: number;
      used: number;
      allocated: number;
      reservable: number;
    };
    uptime: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
  } | {
    _id: string;
    identifier: string;
    __v: number;
    createdAt: string;
    isConnected: boolean;
    restVersion: string;
    secure: boolean;
    statusHistory: {
      timestamp: string;
      online: boolean;
      responseTime: number;
    }[];
    updatedAt: string;
    owner: null;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
    host?: undefined;
    password?: undefined;
    port?: undefined;
    connections?: undefined;
    cpu?: undefined;
    info?: undefined;
    memory?: undefined;
    uptime?: undefined;
  } | {
    _id: string;
    host: string;
    identifier: string;
    owner: {
      _id: string;
      discordId: string;
      __v: number;
      avatar: null;
      createdAt: string;
      discriminator: string;
      nodes: string[];
      updatedAt: string;
      username: string;
      buffer?: undefined;
    };
    password: string;
    port: number;
    restVersion: string;
    secure: boolean;
    isConnected: boolean;
    statusHistory: {
      timestamp: string;
      online: boolean;
      responseTime: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    graphData: {
      date: string;
      uptime: number;
      load: number;
      players: number;
    }[];
    connections?: undefined;
    cpu?: undefined;
    info?: undefined;
    memory?: undefined;
    uptime?: undefined;
  })[];
  cached: boolean;
}

export async function FetchLavaLinkInfo() {
  const res = await fetch('https://lavalink-api.appujet.site/api/nodes');
  return await res.json() as LavalinkInfo
}