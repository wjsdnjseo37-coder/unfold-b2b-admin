-- 언폴드 B2B 어드민 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요

-- 1. 파트너 테이블
CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    region TEXT NOT NULL,
    manager TEXT NOT NULL,
    contact TEXT NOT NULL,
    address TEXT NOT NULL,
    reg_no TEXT NOT NULL,
    budget BIGINT DEFAULT 0,
    status TEXT DEFAULT 'active',
    join_date DATE DEFAULT CURRENT_DATE,
    role TEXT DEFAULT 'partner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 캠페인 테이블
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    trigger TEXT NOT NULL,
    coupon TEXT NOT NULL,
    budget BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT DEFAULT 'pending',
    views INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 정산 테이블
CREATE TABLE settlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    month TEXT NOT NULL,
    amount BIGINT NOT NULL,
    status TEXT DEFAULT 'pending',
    request_date DATE DEFAULT CURRENT_DATE,
    settled_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 제휴 제안서 테이블
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    category TEXT NOT NULL,
    region TEXT NOT NULL,
    contact TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    submitted_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 트리거 테이블
CREATE TABLE triggers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    count INTEGER DEFAULT 0,
    trend INTEGER[] DEFAULT ARRAY[0,0,0,0,0,0,0],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Row Level Security (RLS) 활성화
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE triggers ENABLE ROW LEVEL SECURITY;

-- 7. 공개 읽기 정책 (개발용, 나중에 수정 필요)
CREATE POLICY "Enable read access for all users" ON partners FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON partners FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON campaigns FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON campaigns FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON campaigns FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON settlements FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON settlements FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON settlements FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON proposals FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON proposals FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON proposals FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON triggers FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON triggers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON triggers FOR UPDATE USING (true);

-- 8. 초기 데이터 삽입 (샘플 파트너)
INSERT INTO partners (name, category, region, manager, contact, address, reg_no, budget, status, role)
VALUES 
    ('슈퍼어드민', '시스템', '서울', '관리자', '02-0000-0000', '서울시 강남구', '000-00-00000', 99999999, 'active', 'admin');
