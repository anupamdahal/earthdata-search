import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'

import CollectionResultsItem from './CollectionResultsItem'

import './CollectionResultsList.scss'

export const CollectionResultsList = ({
  collections,
  portal,
  projectIds,
  onAddProjectCollection,
  onRemoveCollectionFromProject,
  onViewCollectionGranules,
  onViewCollectionDetails,
  waypointEnter
}) => {
  const collectionIds = collections.allIds

  const collectionResults = collectionIds.map((id, index) => {
    const collection = collections.byId[id]
    const isLast = collectionIds.length > 0 && index === collectionIds.length - 1

    const isCollectionInProject = projectIds.indexOf(id) !== -1

    return (
      <CollectionResultsItem
        key={collection.id}
        isCollectionInProject={isCollectionInProject}
        collection={collection}
        onAddProjectCollection={onAddProjectCollection}
        onRemoveCollectionFromProject={onRemoveCollectionFromProject}
        onViewCollectionGranules={onViewCollectionGranules}
        onViewCollectionDetails={onViewCollectionDetails}
        isLast={isLast}
        waypointEnter={waypointEnter}
      />
    )
  })

  const {
    portalId,
    org = portalId,
    title = portalId
  } = portal

  return (
    <ul className="collection-results-list">
      {collectionResults}
      {collections.isLoading && (
        <li className="collection-results-list__loading">
          Loading collections...
        </li>
      )}
      {
        portalId.length > 0 && (
          <p className="portal-escape">
            Looking for more collections?
            {' '}
            <a href="/" className="portal-escape-link">
              Leave
              {' '}
              {startCase(org)}
              &#39;s
              {' '}
              {startCase(title)}
              {' '}
              Portal
            </a>
          </p>
        )
      }
    </ul>
  )
}

CollectionResultsList.propTypes = {
  collections: PropTypes.shape({}).isRequired,
  portal: PropTypes.shape({}).isRequired,
  projectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddProjectCollection: PropTypes.func.isRequired,
  onRemoveCollectionFromProject: PropTypes.func.isRequired,
  onViewCollectionGranules: PropTypes.func.isRequired,
  onViewCollectionDetails: PropTypes.func.isRequired,
  waypointEnter: PropTypes.func.isRequired
}

export default CollectionResultsList
