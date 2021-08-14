process.stdin
  .on('data', (chunk) => {
    console.log(`Block read: size ${chunk.length} - ${chunk.toString()}`)
  })
  .on('error', (err) => {
    console.log('!!!!!!!!!!')
  })
