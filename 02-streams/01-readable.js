process.stdin
  .on('readable', () => {
    let chunk
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Block read: size ${chunk.length} - ${chunk.toString()}`)
    }
  })
  .on('error', (err) => {
    console.log('!!!!!!!!!!')
  })
