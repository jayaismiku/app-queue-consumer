/* eslint-disable space-before-function-paren */
/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg')

class SongsService {
  constructor() {
    this._pool = new Pool()
  }

  async getSongs(userId) {
    const query = {
      text: `SELECT songs.* FROM songs
      LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id
      LEFT JOIN playlist ON playlist.id = playlistsongs.playlist_id
      WHERE playlist.owner = $1
      GROUP BY songs.id`,
      values: [userId]
    }
    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = SongsService
