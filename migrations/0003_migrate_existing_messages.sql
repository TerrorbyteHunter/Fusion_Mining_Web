-- Create threads for existing messages
INSERT INTO message_threads (id, title, buyer_id, seller_id, status, last_message_at, created_at)
SELECT 
    gen_random_uuid(),
    COALESCE(m.subject, 'No Subject'),
    CASE 
        WHEN u.role = 'buyer' THEN m.sender_id
        ELSE m.receiver_id
    END as buyer_id,
    CASE 
        WHEN u.role = 'seller' THEN m.sender_id
        WHEN u2.role = 'seller' THEN m.receiver_id
        ELSE NULL
    END as seller_id,
    'open'::thread_status,
    m.created_at,
    m.created_at
FROM messages m
LEFT JOIN users u ON m.sender_id = u.id
LEFT JOIN users u2 ON m.receiver_id = u2.id
WHERE m.thread_id IS NULL
GROUP BY m.subject, m.sender_id, m.receiver_id, u.role, u2.role, m.created_at;

-- Update messages to link to their new threads
WITH message_groups AS (
    SELECT 
        m.id as message_id,
        t.id as thread_id
    FROM messages m
    JOIN message_threads t ON 
        (t.buyer_id = m.sender_id OR t.buyer_id = m.receiver_id) AND
        (t.seller_id = m.sender_id OR t.seller_id = m.receiver_id OR t.seller_id IS NULL)
    WHERE m.thread_id IS NULL
)
UPDATE messages m
SET thread_id = mg.thread_id
FROM message_groups mg
WHERE m.id = mg.message_id;