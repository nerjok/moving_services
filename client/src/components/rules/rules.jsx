import React from 'react';



export const Rules = (params) => {
  return (
    <section className="page-height">
    <div className="container p-5">
      <h1 className="text-right">Rules</h1>

      <div>
        <ul className="list-group">
          <li className="list-group-item">
            No spam. All automated messages, advertisements, and links to competitor websites will be deleted immediately.
          </li>
          <li className="list-group-item">
             Post in relevant sub-forums only. Messages posted in the wrong topic area will be removed and placed in the correct sub-forum by moderators.
          </li>
          <li className="list-group-item">
              Respect other users. No flaming or abusing fellow forum members. Users who continue to post inflammatory, abusive comments will be deleted from the forum after two warnings are issued by moderators.
          </li>
          <li className="list-group-item">
             Harassment. No threats or harassment of other users will be tolerated. Any instance of threatening or harassing behavior is grounds for deletion from the forums.
          </li>
          <li className="list-group-item">
             Adult content. No profanity or pornography is allowed. Posts containing adult material will be deleted.
          </li>
          <li className="list-group-item">
             Bandwidth. All images and signatures must be 500 x 500 pixels or smaller. Posts containing over-sized images and signatures will be removed.
          </li>
          <li className="list-group-item">
              Illegal content. No re-posting of copyrighted materials or other illegal content is allowed. Any posts containing illegal content or copyrighted materials will be deleted.
          </li>
        </ul>
      </div>
    </div>
    </section>
  )
}