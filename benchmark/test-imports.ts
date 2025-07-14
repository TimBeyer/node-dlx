console.log('Starting benchmark...')

try {
  const { find, findRaw } = await import('../built/lib/index.js')
  console.log('Successfully imported main functions:', typeof find, typeof findRaw)

  const { ALL_CONSTRAINTS } = await import('./pentomino/field.js')
  console.log(
    'Successfully imported ALL_CONSTRAINTS:',
    Array.isArray(ALL_CONSTRAINTS),
    ALL_CONSTRAINTS.length
  )

  const { getSearchConfig } = await import('../built/lib/utils.js')
  console.log('Successfully imported getSearchConfig:', typeof getSearchConfig)

  console.log('All imports successful!')
} catch (error) {
  console.error('Import failed:', error)
}
