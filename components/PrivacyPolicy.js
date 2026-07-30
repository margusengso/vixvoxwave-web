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
          features. The website is static and launches without product
          analytics, advertising, account creation, or a contact form.
        </p>
        <p className="policy__date">
          Effective and last updated: <time dateTime="2026-07-30">30 July 2026</time>
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
        <h2 id="app-processing">3. How the app handles audio</h2>
        <ul>
          <li>
            <strong>You start every listening session.</strong> The app asks
            for microphone access only after you choose to start listening.
            Listening is foreground-only, stays on a visible session screen,
            and can be stopped at any time.
          </li>
          <li>
            <strong>Analysis happens on your device.</strong> In Default mode,
            the app can analyze speech and room events locally. Ambient Only
            analyzes room events without speech transcription.
          </li>
          <li>
            <strong>Captured content is temporary.</strong> A bounded rolling
            audio window of about 210 seconds lets a selected moment survive
            until replay. Transcripts and candidates remain in current-session
            memory. Extracted and transformed audio files are temporary.
          </li>
          <li>
            <strong>Cleanup follows the session.</strong> The app attempts to
            delete session-owned audio when you stop, switch mode, leave the
            listening screen, or move the app out of the foreground. If a
            force-quit prevents cleanup, the next launch removes abandoned
            files from VixVoxWave-owned cache locations before the app becomes
            usable. The operating system may also clear app cache.
          </li>
          <li>
            <strong>There is no captured-content history.</strong> The app does
            not keep a history of audio, transcripts, phrases, room events, or
            replays and cannot restore them after a session.
          </li>
        </ul>
        <p>
          VixVoxWave does not upload microphone audio, transcripts, or acoustic
          features to the developer or to a speech-processing service.
        </p>
      </section>

      <section aria-labelledby="local-settings">
        <h2 id="local-settings">4. Information stored on your device</h2>
        <p>
          The app stores a small allowlisted settings record so it can remember
          your privacy acknowledgement, listening and replay preferences, and
          automatic language setting. It does not store captured-content
          identifiers or a user account. Native builds keep those settings in
          app storage; a browser build may use one origin-local storage key for
          the same non-content settings.
        </p>
        <p>
          You can revoke microphone permission in your device settings. You can
          remove local app data using your operating system&apos;s app-data
          controls or by uninstalling the app, subject to any device-backup
          behavior controlled by your platform provider.
        </p>
      </section>

      <section aria-labelledby="app-network">
        <h2 id="app-network">5. App network services and diagnostics</h2>
        <p>
          The current app has no user accounts, advertising, developer product
          analytics, or active purchase system. Apple, Google, and Expo/EAS may
          process routine app-store, installation, update-check, device, and
          diagnostic information under their own settings and privacy terms.
          Those technical services do not receive microphone content from
          VixVoxWave.
        </p>
        <p>
          Development builds can create privacy-filtered console diagnostics
          about timing, counts, coarse labels, outcomes, and errors. They do
          not include raw audio, full transcripts, private file paths, or
          content identifiers, and they are not automatically sent to an
          analytics service. A tester controls any manual sharing.
        </p>
      </section>

      <section aria-labelledby="website-data">
        <h2 id="website-data">6. Website and support data</h2>
        <div className="policy-table-wrap">
          <table>
            <caption>Website and support processing</caption>
            <thead>
              <tr>
                <th scope="col">Activity</th>
                <th scope="col">Information</th>
                <th scope="col">Why</th>
                <th scope="col">Retention</th>
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
                <td>Deliver, secure, troubleshoot, and operate the static site</td>
                <td>
                  AWS Amplify&apos;s hosting access logs are retained for the
                  lifetime of the hosted app under its current service
                  behavior
                </td>
              </tr>
              <tr>
                <th scope="row">Email support</th>
                <td>
                  Your email address, message, attachments, and related email
                  headers
                </td>
                <td>Reply, investigate the issue you report, and maintain necessary records</td>
                <td>
                  Until the issue and reasonable follow-up are complete, unless
                  a longer period is needed for security, legal obligations, or
                  legal claims
                </td>
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
        <h2 id="purposes">7. Purposes and legal grounds</h2>
        <p>
          Where data-protection law requires a legal basis, VixVoxWave relies
          on providing the feature or support you request, taking steps at your
          request, and legitimate interests in keeping the website and service
          secure and reliable. Where consent is required, it is requested
          separately. A device microphone permission is also a technical
          control you can revoke; it is not used as permission for advertising
          or unrelated processing.
        </p>
      </section>

      <section aria-labelledby="sharing">
        <h2 id="sharing">8. Service providers, sharing, and transfers</h2>
        <p>
          The static website is hosted through Amazon Web Services (AWS)
          Amplify and its global content-delivery network. Support email is
          processed through Google&apos;s Gmail service and your own email
          provider. App distribution and updates may involve Apple, Google, and
          Expo. These providers process relevant technical data under their
          agreements and privacy terms and may operate internationally.
        </p>
        <p>
          VixVoxWave does not sell personal data and does not share it for
          behavioral advertising. Information may be disclosed when reasonably
          necessary to comply with law, protect users or the service, or
          establish, exercise, or defend legal claims.
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
          device, limiting temporary retention, using app-scoped storage, and
          avoiding accounts and advertising identifiers in the current
          release. No device, storage system, email service, or network can be
          guaranteed perfectly secure.
        </p>
        <p>
          Do not use VixVoxWave for covert recording. If other people may be
          captured by the microphone, tell them and obtain any permission
          required where you are.
        </p>
      </section>

      <section aria-labelledby="changes">
        <h2 id="changes">11. Changes to this policy</h2>
        <p>
          This policy will be reviewed before adding purchases, accounts,
          remote model downloads, analytics, advertising, a contact form, or
          another service that changes data handling. Material changes will
          update the date above and be presented through an appropriate
          website, app, or store notice.
        </p>
      </section>

      <section aria-labelledby="privacy-contact">
        <h2 id="privacy-contact">12. Contact</h2>
        <p>
          Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </section>
    </div>
  )
}
