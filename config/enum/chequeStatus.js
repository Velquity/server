const chequeStatus = [
    "scheduled",    // Cheque scheduled
    "created",      // Newly created base
    "approved",     // Approved and Signed
    "received",     // Received for issuing
    "issued",       // Cheque borrowed by agent
    "realised",     // Cheque realised from bank
    "cancelled",    // Cheque was not issued
    "correction",   // Cheque send again to fix errors
    "fixed",        // Cheque that fixed errors
    "rejected"      // Cheque rejected by bank
]

export default chequeStatus