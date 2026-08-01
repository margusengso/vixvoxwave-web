import { SUPPORT_EMAIL } from '../lib/site'

export function PrivacyPolicy() {
  return (
    <div className="policy">
      <section aria-labelledby="privacy-summary">
        <p className="eyebrow">Privacy policy</p>
        <h1 id="privacy-summary">Your moments are not our dataset.</h1>
        <p className="policy__lead">
          VixVoxWave is designed around foreground, on-device audio processing.
          The app does not upload microphone audio, transcripts, or acoustic
          features. We do not use accounts, advertising, behavioral tracking,
          or product analytics.
        </p>
        <p className="policy__date">
          Effective and last updated: <time dateTime="2026-08-01">1 August 2026</time>
        </p>
      </section>

      <section aria-labelledby="controller">
        <h2 id="controller">1. Who is responsible</h2>
        <p>
          VixVoxWave is responsible for the processing described in this
          policy. For privacy questions, support, or a data-rights request,
          email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>

      <section aria-labelledby="scope">
        <h2 id="scope">2. What this policy covers</h2>
        <p>
          This policy covers the VixVoxWave mobile app and this website. It
          distinguishes information processed locally by the app from routine
          technical data processed when you visit the website or email support.
        </p>
      </section>

      <section aria-labelledby="app-processing">
        <h2 id="app-processing">3. Microphone and audio processing</h2>
        <p>
          You start every listening session. The app asks for microphone
          permission when you choose to listen, works only while the listening
          screen is visible, and stops when you leave that screen or move the
          app out of the foreground.
        </p>
        <p>
          Audio analysis happens on your device. Default mode can analyze
          speech and room events. Ambient Only analyzes room events without
          transcribing speech. VixVoxWave does not upload microphone audio,
          transcripts, or acoustic features to us or to a speech-processing
          service.
        </p>
        <p>
          Captured content is temporary. The app keeps a rolling audio window
          of up to about 210 seconds so it can replay a selected moment.
          Transcripts, detected events, and replay files are used only during
          the current session. They are deleted when the session ends and
          cannot be restored later. If the app closes before cleanup finishes,
          it removes remaining temporary files the next time it opens.
        </p>
      </section>

      <section aria-labelledby="local-settings">
        <h2 id="local-settings">4. Settings stored on your device</h2>
        <p>
          The app stores your privacy acknowledgement and listening, replay,
          mode, and language preferences on your device. These settings do not
          include captured audio, transcripts, detected room events, or a user
          account.
        </p>
        <p>
          You can revoke microphone permission in your device settings. You can
          remove the app&apos;s local data using your device&apos;s app-data
          controls or by uninstalling the app.
        </p>
      </section>

      <section aria-labelledby="app-network">
        <h2 id="app-network">5. Information we receive</h2>
        <p>
          VixVoxWave does not send captured audio, transcripts, room-event
          features, or replay content to us or to a speech-processing service.
          The app has no user accounts, advertising, behavioral tracking,
          or analytics. The app currently does not offer purchases.
        </p>
        <div className="policy-table-wrap">
          <table>
            <caption>Information we may receive outside the app</caption>
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col">Information</th>
                <th scope="col">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Visit the website</th>
                <td>
                  Routine request data such as IP address, date and time,
                  requested path, browser or user-agent details, referrer, and
                  response status
                </td>
                <td>Deliver, secure, troubleshoot, and operate the website</td>
              </tr>
              <tr>
                <th scope="row">Email support</th>
                <td>
                  Your email address, message, attachments, and related email
                  headers
                </td>
                <td>Reply to you, investigate the issue, and keep necessary records</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The website does not set nonessential cookies, store browser
          preferences, run client analytics, show ads, embed social media, or
          collect information through a web form.
        </p>
      </section>

      <section aria-labelledby="purposes">
        <h2 id="purposes">6. How and why we use information</h2>
        <p>
          We use website request data to deliver, secure, and troubleshoot the
          website. We use support messages to answer you and investigate the
          issue you report. Where law requires a legal basis, we rely on
          providing the service or support you request, our legitimate
          interests in operating a secure and reliable service, compliance
          with legal obligations, or consent where we ask for it.
        </p>
      </section>

      <section aria-labelledby="sharing">
        <h2 id="sharing">7. Sharing and international transfers</h2>
        <p>
          We use service providers to deliver and secure the website, process
          support email, and distribute the app. They process information only
          as needed to provide those services. They may operate in countries
          other than your own; where required, we use appropriate safeguards
          for international transfers.
        </p>
        <p>
          VixVoxWave does not sell personal data and does not share it for
          behavioral advertising. Information may be disclosed when reasonably
          necessary to comply with law, protect users or the service, or
          establish, exercise, or defend legal claims.
        </p>
      </section>

      <section aria-labelledby="retention">
        <h2 id="retention">8. How long we keep information</h2>
        <p>
          The app&apos;s captured content is temporary and is handled as
          described above. Website request data is kept only as long as
          reasonably necessary for security, troubleshooting, and operation.
          Support correspondence is kept until the issue and reasonable
          follow-up are complete, unless a longer period is needed for
          security, legal obligations, or legal claims.
        </p>
      </section>

      <section aria-labelledby="choices-rights">
        <h2 id="choices-rights">9. Your choices and rights</h2>
        <p>
          You control listening through Start, Stop, mode selection, and your
          operating system&apos;s microphone permission. Because VixVoxWave
          does not receive your captured audio or transcripts, it has no
          server-held copy of that content to provide or delete.
        </p>
        <p>
          Depending on where you live, you may have rights to information,
          access, correction, deletion, restriction, portability, or objection.
          You may also withdraw consent where consent is the basis for
          processing. Email us to make a request. We may need enough
          information to verify that the request relates to you. You may lodge
          a complaint with the data-protection or consumer authority where you
          live.
        </p>
      </section>

      <section aria-labelledby="security">
        <h2 id="security">10. Security and responsible use</h2>
        <p>
          VixVoxWave reduces risk by keeping microphone-content processing on
          device, limiting temporary retention, and avoiding accounts,
          advertising identifiers, and behavioral tracking. No device,
          storage system, email service, or network can be guaranteed perfectly
          secure.
        </p>
        <p>
          Do not use VixVoxWave for covert recording. If other people may be
          captured by the microphone, tell them and obtain any permission
          required where you are.
        </p>
      </section>

      <section aria-labelledby="children">
        <h2 id="children">11. Children&apos;s privacy</h2>
        <p>
          VixVoxWave does not create user profiles or knowingly collect
          children&apos;s microphone content. If a child emails support, a
          parent or guardian may contact us to request deletion of that
          correspondence.
        </p>
      </section>

      <section aria-labelledby="changes">
        <h2 id="changes">12. Changes to this policy</h2>
        <p>
          We may update this policy when VixVoxWave or its data handling
          changes. We will update the date above and provide an appropriate
          website, app, or store notice for material changes.
        </p>
      </section>

      <section aria-labelledby="privacy-contact">
        <h2 id="privacy-contact">13. Contact</h2>
        <p>
          Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </section>
    </div>
  )
}
