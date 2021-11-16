/* eslint-disable space-before-function-paren */
class Listener {
  constructor(songsService, mailSender) {
    this._songsService = songsService
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString())

      const notes = await this._songsService.getNotes(userId)
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes))
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Listener
