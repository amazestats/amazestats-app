import { TestBed } from '@angular/core/testing';

import { ResultService } from './result.service';
import { Set } from './set'
import { Team } from './team'

const TEAM_1: Team = {
  id: 17,
  name: 'IFK Norrköping',
}

const HOME_WIN_SET: Set = {
  id: 1,
  match: 17,
  homeScore: 25,
  awayScore: 13,
}

const AWAY_WIN_SET: Set = {
  id: 2,
  match: 17,
  homeScore: 25,
  awayScore: 27,
}

fdescribe('ResultService', () => {
  let service: ResultService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = new ResultService()
  })

  describe('getMatchesPlayed', () => {

    it('only matches played by team', () => {
      expect(service.getMatchesPlayed(
        {
          id: 1,
          name: 'dummy'
        },
        [
          {
            id: 1,
            awayTeam: 1,
            homeTeam: 2,
            sets: [HOME_WIN_SET],
          },
          {
            id: 2,
            awayTeam: 2,
            homeTeam: 3,
            sets: [HOME_WIN_SET],
          }
        ]
      ).length).toBe(1)
    })

    it('only matches with sets played', () => {
      expect(service.getMatchesPlayed(
        {
          id: 1,
          name: 'dummy'
        },
        [
          {
            id: 1,
            awayTeam: 1,
            homeTeam: 2,
            sets: [HOME_WIN_SET],
          },
          {
            id: 2,
            awayTeam: 1,
            homeTeam: 3,
            sets: [AWAY_WIN_SET],
          },
          {
            id: 2,
            awayTeam: 1,
            homeTeam: 3,
            sets: [],
          }
        ]
      ).length).toBe(2)
    })

    it('both home and away matches', () => {
      expect(service.getMatchesPlayed(
        {
          id: 1,
          name: 'dummy'
        },
        [
          {
            id: 1,
            awayTeam: 1,
            homeTeam: 2,
            sets: [AWAY_WIN_SET],
          },
          {
            id: 2,
            awayTeam: 3,
            homeTeam: 1,
            sets: [HOME_WIN_SET],
          },
        ]
      ).length).toBe(2)
    })

    it('no matches played', () => {
      expect(service.getMatchesPlayed(
        {
          id: 2,
          name: 'dummy'
        },
        [
          {
            id: 1,
            awayTeam: 1,
            homeTeam: 3,
            sets: [AWAY_WIN_SET],
          },
        ]
      ).length).toBe(0)
    })
  })

  describe('getMatchesWon', () => {

    it('no matches played', () => {
      expect(service.getMatchesWon(
        TEAM_1,
        [
          {
            id: 13,
            homeTeam: 4,
            awayTeam: 5,
            sets: [HOME_WIN_SET, AWAY_WIN_SET, HOME_WIN_SET]
          }
        ],
      )).toEqual([])
    })

    it('no matches won', () => {
      expect(service.getMatchesWon(
        TEAM_1,
        [
          {
            id: 13,
            homeTeam: 5,
            awayTeam: TEAM_1.id,
            sets: [HOME_WIN_SET, AWAY_WIN_SET, HOME_WIN_SET]
          },
          {
            id: 14,
            homeTeam: TEAM_1.id,
            awayTeam: 3,
            sets: [AWAY_WIN_SET, AWAY_WIN_SET, HOME_WIN_SET]
          },
        ],
      )).toEqual([])
    })

    it('correct amount wins', () => {
      expect(service.getMatchesWon(
        TEAM_1,
        [
          {
            id: 13,
            homeTeam: 5,
            awayTeam: TEAM_1.id,
            sets: [HOME_WIN_SET, AWAY_WIN_SET, AWAY_WIN_SET]
          },
          {
            id: 14,
            homeTeam: TEAM_1.id,
            awayTeam: 3,
            sets: [AWAY_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
          },
        ],
      )).toEqual([{
        id: 13,
        homeTeam: 5,
        awayTeam: TEAM_1.id,
        sets: [HOME_WIN_SET, AWAY_WIN_SET, AWAY_WIN_SET]
      }])
    })
  })

  describe('getMatchesLost', () => {

    it('no matches played', () => {
      expect(service.getMatchesLost(
        TEAM_1,
        [
          {
            id: 13,
            homeTeam: 4,
            awayTeam: 5,
            sets: [HOME_WIN_SET, AWAY_WIN_SET, HOME_WIN_SET]
          }
        ],
      )).toEqual([])
    })

    it('no matches lost', () => {
      expect(service.getMatchesLost(
        TEAM_1,
        [
          {
            id: 13,
            homeTeam: 5,
            awayTeam: TEAM_1.id,
            sets: [HOME_WIN_SET, AWAY_WIN_SET, AWAY_WIN_SET]
          },
          {
            id: 14,
            homeTeam: TEAM_1.id,
            awayTeam: 3,
            sets: [AWAY_WIN_SET, HOME_WIN_SET, HOME_WIN_SET]
          },
        ],
      )).toEqual([])

    })

    it('correct amount of matches lost', () => {
      expect(service.getMatchesLost(
        TEAM_1,
        [
          {
            id: 13,
            homeTeam: 5,
            awayTeam: TEAM_1.id,
            sets: [HOME_WIN_SET, AWAY_WIN_SET, AWAY_WIN_SET]
          },
          {
            id: 15,
            homeTeam: TEAM_1.id,
            awayTeam: 3,
            sets: [AWAY_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
          },
          {
            id: 14,
            homeTeam: TEAM_1.id,
            awayTeam: 7,
            sets: [AWAY_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
          },
        ],
      )).toEqual([
        {
          id: 15,
          homeTeam: TEAM_1.id,
          awayTeam: 3,
          sets: [AWAY_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
        },
        {
          id: 14,
          homeTeam: TEAM_1.id,
          awayTeam: 7,
          sets: [AWAY_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
        },
      ])
    })

  })

  describe('getMatchWinner', () => {

    it('match has no sets', () => {
      expect(() => service.getMatchWinner(
        {
          id: 17,
          homeTeam: 1,
          awayTeam: 2,
          sets: [],
        }
      )).toThrow()
    })

    it('match won by home team', () => {
      expect(service.getMatchWinner(
        {
          id: 17,
          homeTeam: 13,
          awayTeam: 2,
          sets: [
            HOME_WIN_SET,
            HOME_WIN_SET,
          ],
        }
      )).toBe(13)
    })

    it('match won by away team', () => {
      expect(service.getMatchWinner(
        {
          id: 17,
          homeTeam: 1,
          awayTeam: 2,
          sets: [
            HOME_WIN_SET,
            AWAY_WIN_SET,
            HOME_WIN_SET,
            AWAY_WIN_SET,
            AWAY_WIN_SET,
          ],
        }
      )).toBe(2)
    })

    it('match equal set wins', () => {
      expect(() => service.getMatchWinner(
        {
          id: 17,
          homeTeam: 1,
          awayTeam: 2,
          sets: [HOME_WIN_SET, AWAY_WIN_SET],
        }
      )).toThrow()
    })
  })

  describe('getSetWinner', () => {

    it('equal score', () => {
      expect(service.getSetWinner({
        id: 1,
        match: 17,
        homeScore: 13,
        awayScore: 13,
      })).toBe(0)
    })

    it('home team win', () => {
      expect(service.getSetWinner(HOME_WIN_SET)).toBe(1)
    })

    it('away team win', () => {
      expect(service.getSetWinner(AWAY_WIN_SET)).toBe(-1)
    })
  })

  describe('getSetsWon', () => {

    it('correct set won count', () => {
      expect(service.getSetsWon(
        TEAM_1,
        [
          {
            id: 1,
            homeTeam: TEAM_1.id,
            awayTeam: 3,
            sets: [HOME_WIN_SET, AWAY_WIN_SET, AWAY_WIN_SET]
          },
          {
            id: 2,
            homeTeam: TEAM_1.id,
            awayTeam: 3,
            sets: [HOME_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
          },
        ]
      )).toBe(3)
    })
  })

  describe('getSetsLost', () => {

    it('correct set lost count', () => {
      expect(service.getSetsLost(
        TEAM_1,
        [
          {
            id: 2,
            homeTeam: TEAM_1.id,
            awayTeam: 3,
            sets: [HOME_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
          },
          {
            id: 3,
            homeTeam: TEAM_1.id,
            awayTeam: 4,
            sets: [HOME_WIN_SET, HOME_WIN_SET, AWAY_WIN_SET]
          },
        ]
      )).toBe(2)
    })
  })
})
