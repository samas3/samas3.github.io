/*! For license information please see main.e96a94.js.LICENSE.txt */
// 列数
let r = 0 | Math.sqrt(innerWidth / innerHeight * 20);
// 解密
(()=>{
    var e = {
        745: function(e, t) {
            !function(e) {
                "use strict";
                var t = (e,t,n,i)=>{
                    let r = 65535 & e | 0
                      , o = e >>> 16 & 65535 | 0
                      , a = 0;
                    for (; 0 !== n; ) {
                        a = n > 2e3 ? 2e3 : n,
                        n -= a;
                        do {
                            r = r + t[i++] | 0,
                            o = o + r | 0
                        } while (--a);
                        r %= 65521,
                        o %= 65521
                    }
                    return r | o << 16 | 0
                }
                ;
                const n = new Uint32Array((()=>{
                    let e, t = [];
                    for (var n = 0; n < 256; n++) {
                        e = n;
                        for (var i = 0; i < 8; i++)
                            e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                        t[n] = e
                    }
                    return t
                }
                )());
                var i = (e,t,i,r)=>{
                    const o = n
                      , a = r + i;
                    e ^= -1;
                    for (let n = r; n < a; n++)
                        e = e >>> 8 ^ o[255 & (e ^ t[n])];
                    return -1 ^ e
                }
                  , r = function(e, t) {
                    let n, i, r, o, a, s, l, c, d, f, h, u, w, m, g, b, x, k, _, y, p, v, A, E;
                    const R = e.state;
                    n = e.next_in,
                    A = e.input,
                    i = n + (e.avail_in - 5),
                    r = e.next_out,
                    E = e.output,
                    o = r - (t - e.avail_out),
                    a = r + (e.avail_out - 257),
                    s = R.dmax,
                    l = R.wsize,
                    c = R.whave,
                    d = R.wnext,
                    f = R.window,
                    h = R.hold,
                    u = R.bits,
                    w = R.lencode,
                    m = R.distcode,
                    g = (1 << R.lenbits) - 1,
                    b = (1 << R.distbits) - 1;
                    e: do {
                        u < 15 && (h += A[n++] << u,
                        u += 8,
                        h += A[n++] << u,
                        u += 8),
                        x = w[h & g];
                        t: for (; ; ) {
                            if (k = x >>> 24,
                            h >>>= k,
                            u -= k,
                            k = x >>> 16 & 255,
                            0 === k)
                                E[r++] = 65535 & x;
                            else {
                                if (!(16 & k)) {
                                    if (0 == (64 & k)) {
                                        x = w[(65535 & x) + (h & (1 << k) - 1)];
                                        continue t
                                    }
                                    if (32 & k) {
                                        R.mode = 12;
                                        break e
                                    }
                                    e.msg = "invalid literal/length code",
                                    R.mode = 30;
                                    break e
                                }
                                _ = 65535 & x,
                                k &= 15,
                                k && (u < k && (h += A[n++] << u,
                                u += 8),
                                _ += h & (1 << k) - 1,
                                h >>>= k,
                                u -= k),
                                u < 15 && (h += A[n++] << u,
                                u += 8,
                                h += A[n++] << u,
                                u += 8),
                                x = m[h & b];
                                n: for (; ; ) {
                                    if (k = x >>> 24,
                                    h >>>= k,
                                    u -= k,
                                    k = x >>> 16 & 255,
                                    !(16 & k)) {
                                        if (0 == (64 & k)) {
                                            x = m[(65535 & x) + (h & (1 << k) - 1)];
                                            continue n
                                        }
                                        e.msg = "invalid distance code",
                                        R.mode = 30;
                                        break e
                                    }
                                    if (y = 65535 & x,
                                    k &= 15,
                                    u < k && (h += A[n++] << u,
                                    u += 8,
                                    u < k && (h += A[n++] << u,
                                    u += 8)),
                                    y += h & (1 << k) - 1,
                                    y > s) {
                                        e.msg = "invalid distance too far back",
                                        R.mode = 30;
                                        break e
                                    }
                                    if (h >>>= k,
                                    u -= k,
                                    k = r - o,
                                    y > k) {
                                        if (k = y - k,
                                        k > c && R.sane) {
                                            e.msg = "invalid distance too far back",
                                            R.mode = 30;
                                            break e
                                        }
                                        if (p = 0,
                                        v = f,
                                        0 === d) {
                                            if (p += l - k,
                                            k < _) {
                                                _ -= k;
                                                do {
                                                    E[r++] = f[p++]
                                                } while (--k);
                                                p = r - y,
                                                v = E
                                            }
                                        } else if (d < k) {
                                            if (p += l + d - k,
                                            k -= d,
                                            k < _) {
                                                _ -= k;
                                                do {
                                                    E[r++] = f[p++]
                                                } while (--k);
                                                if (p = 0,
                                                d < _) {
                                                    k = d,
                                                    _ -= k;
                                                    do {
                                                        E[r++] = f[p++]
                                                    } while (--k);
                                                    p = r - y,
                                                    v = E
                                                }
                                            }
                                        } else if (p += d - k,
                                        k < _) {
                                            _ -= k;
                                            do {
                                                E[r++] = f[p++]
                                            } while (--k);
                                            p = r - y,
                                            v = E
                                        }
                                        for (; _ > 2; )
                                            E[r++] = v[p++],
                                            E[r++] = v[p++],
                                            E[r++] = v[p++],
                                            _ -= 3;
                                        _ && (E[r++] = v[p++],
                                        _ > 1 && (E[r++] = v[p++]))
                                    } else {
                                        p = r - y;
                                        do {
                                            E[r++] = E[p++],
                                            E[r++] = E[p++],
                                            E[r++] = E[p++],
                                            _ -= 3
                                        } while (_ > 2);
                                        _ && (E[r++] = E[p++],
                                        _ > 1 && (E[r++] = E[p++]))
                                    }
                                    break
                                }
                            }
                            break
                        }
                    } while (n < i && r < a);
                    _ = u >> 3,
                    n -= _,
                    u -= _ << 3,
                    h &= (1 << u) - 1,
                    e.next_in = n,
                    e.next_out = r,
                    e.avail_in = n < i ? i - n + 5 : 5 - (n - i),
                    e.avail_out = r < a ? a - r + 257 : 257 - (r - a),
                    R.hold = h,
                    R.bits = u
                };
                const o = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0])
                  , a = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78])
                  , s = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0])
                  , l = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
                var c = (e,t,n,i,r,c,d,f)=>{
                    const h = f.bits;
                    let u, w, m, g, b, x, k = 0, _ = 0, y = 0, p = 0, v = 0, A = 0, E = 0, R = 0, C = 0, S = 0, Z = null, T = 0;
                    const I = new Uint16Array(16)
                      , U = new Uint16Array(16);
                    let O, D, B, F = null, N = 0;
                    for (k = 0; k <= 15; k++)
                        I[k] = 0;
                    for (_ = 0; _ < i; _++)
                        I[t[n + _]]++;
                    for (v = h,
                    p = 15; p >= 1 && 0 === I[p]; p--)
                        ;
                    if (v > p && (v = p),
                    0 === p)
                        return r[c++] = 20971520,
                        r[c++] = 20971520,
                        f.bits = 1,
                        0;
                    for (y = 1; y < p && 0 === I[y]; y++)
                        ;
                    for (v < y && (v = y),
                    R = 1,
                    k = 1; k <= 15; k++)
                        if (R <<= 1,
                        R -= I[k],
                        R < 0)
                            return -1;
                    if (R > 0 && (0 === e || 1 !== p))
                        return -1;
                    for (U[1] = 0,
                    k = 1; k < 15; k++)
                        U[k + 1] = U[k] + I[k];
                    for (_ = 0; _ < i; _++)
                        0 !== t[n + _] && (d[U[t[n + _]]++] = _);
                    if (0 === e ? (Z = F = d,
                    x = 19) : 1 === e ? (Z = o,
                    T -= 257,
                    F = a,
                    N -= 257,
                    x = 256) : (Z = s,
                    F = l,
                    x = -1),
                    S = 0,
                    _ = 0,
                    k = y,
                    b = c,
                    A = v,
                    E = 0,
                    m = -1,
                    C = 1 << v,
                    g = C - 1,
                    1 === e && C > 852 || 2 === e && C > 592)
                        return 1;
                    for (; ; ) {
                        O = k - E,
                        d[_] < x ? (D = 0,
                        B = d[_]) : d[_] > x ? (D = F[N + d[_]],
                        B = Z[T + d[_]]) : (D = 96,
                        B = 0),
                        u = 1 << k - E,
                        w = 1 << A,
                        y = w;
                        do {
                            w -= u,
                            r[b + (S >> E) + w] = O << 24 | D << 16 | B | 0
                        } while (0 !== w);
                        for (u = 1 << k - 1; S & u; )
                            u >>= 1;
                        if (0 !== u ? (S &= u - 1,
                        S += u) : S = 0,
                        _++,
                        0 == --I[k]) {
                            if (k === p)
                                break;
                            k = t[n + d[_]]
                        }
                        if (k > v && (S & g) !== m) {
                            for (0 === E && (E = v),
                            b += y,
                            A = k - E,
                            R = 1 << A; A + E < p && (R -= I[A + E],
                            !(R <= 0)); )
                                A++,
                                R <<= 1;
                            if (C += 1 << A,
                            1 === e && C > 852 || 2 === e && C > 592)
                                return 1;
                            m = S & g,
                            r[m] = v << 24 | A << 16 | b - c | 0
                        }
                    }
                    return 0 !== S && (r[b + S] = k - E << 24 | 64 << 16 | 0),
                    f.bits = v,
                    0
                }
                  , d = {
                    Z_NO_FLUSH: 0,
                    Z_PARTIAL_FLUSH: 1,
                    Z_SYNC_FLUSH: 2,
                    Z_FULL_FLUSH: 3,
                    Z_FINISH: 4,
                    Z_BLOCK: 5,
                    Z_TREES: 6,
                    Z_OK: 0,
                    Z_STREAM_END: 1,
                    Z_NEED_DICT: 2,
                    Z_ERRNO: -1,
                    Z_STREAM_ERROR: -2,
                    Z_DATA_ERROR: -3,
                    Z_MEM_ERROR: -4,
                    Z_BUF_ERROR: -5,
                    Z_NO_COMPRESSION: 0,
                    Z_BEST_SPEED: 1,
                    Z_BEST_COMPRESSION: 9,
                    Z_DEFAULT_COMPRESSION: -1,
                    Z_FILTERED: 1,
                    Z_HUFFMAN_ONLY: 2,
                    Z_RLE: 3,
                    Z_FIXED: 4,
                    Z_DEFAULT_STRATEGY: 0,
                    Z_BINARY: 0,
                    Z_TEXT: 1,
                    Z_UNKNOWN: 2,
                    Z_DEFLATED: 8
                };
                const {Z_FINISH: f, Z_BLOCK: h, Z_TREES: u, Z_OK: w, Z_STREAM_END: m, Z_NEED_DICT: g, Z_STREAM_ERROR: b, Z_DATA_ERROR: x, Z_MEM_ERROR: k, Z_BUF_ERROR: _, Z_DEFLATED: y} = d
                  , p = 12
                  , v = 30
                  , A = e=>(e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
                function E() {
                    this.mode = 0,
                    this.last = !1,
                    this.wrap = 0,
                    this.havedict = !1,
                    this.flags = 0,
                    this.dmax = 0,
                    this.check = 0,
                    this.total = 0,
                    this.head = null,
                    this.wbits = 0,
                    this.wsize = 0,
                    this.whave = 0,
                    this.wnext = 0,
                    this.window = null,
                    this.hold = 0,
                    this.bits = 0,
                    this.length = 0,
                    this.offset = 0,
                    this.extra = 0,
                    this.lencode = null,
                    this.distcode = null,
                    this.lenbits = 0,
                    this.distbits = 0,
                    this.ncode = 0,
                    this.nlen = 0,
                    this.ndist = 0,
                    this.have = 0,
                    this.next = null,
                    this.lens = new Uint16Array(320),
                    this.work = new Uint16Array(288),
                    this.lendyn = null,
                    this.distdyn = null,
                    this.sane = 0,
                    this.back = 0,
                    this.was = 0
                }
                const R = e=>{
                    if (!e || !e.state)
                        return b;
                    const t = e.state;
                    return e.total_in = e.total_out = t.total = 0,
                    e.msg = "",
                    t.wrap && (e.adler = 1 & t.wrap),
                    t.mode = 1,
                    t.last = 0,
                    t.havedict = 0,
                    t.dmax = 32768,
                    t.head = null,
                    t.hold = 0,
                    t.bits = 0,
                    t.lencode = t.lendyn = new Int32Array(852),
                    t.distcode = t.distdyn = new Int32Array(592),
                    t.sane = 1,
                    t.back = -1,
                    w
                }
                  , C = e=>{
                    if (!e || !e.state)
                        return b;
                    const t = e.state;
                    return t.wsize = 0,
                    t.whave = 0,
                    t.wnext = 0,
                    R(e)
                }
                  , S = (e,t)=>{
                    let n;
                    if (!e || !e.state)
                        return b;
                    const i = e.state;
                    return t < 0 ? (n = 0,
                    t = -t) : (n = 1 + (t >> 4),
                    t < 48 && (t &= 15)),
                    t && (t < 8 || t > 15) ? b : (null !== i.window && i.wbits !== t && (i.window = null),
                    i.wrap = n,
                    i.wbits = t,
                    C(e))
                }
                  , Z = (e,t)=>{
                    if (!e)
                        return b;
                    const n = new E;
                    e.state = n,
                    n.window = null;
                    const i = S(e, t);
                    return i !== w && (e.state = null),
                    i
                }
                ;
                let T, I, U = !0;
                const O = e=>{
                    if (U) {
                        T = new Int32Array(512),
                        I = new Int32Array(32);
                        let t = 0;
                        for (; t < 144; )
                            e.lens[t++] = 8;
                        for (; t < 256; )
                            e.lens[t++] = 9;
                        for (; t < 280; )
                            e.lens[t++] = 7;
                        for (; t < 288; )
                            e.lens[t++] = 8;
                        for (c(1, e.lens, 0, 288, T, 0, e.work, {
                            bits: 9
                        }),
                        t = 0; t < 32; )
                            e.lens[t++] = 5;
                        c(2, e.lens, 0, 32, I, 0, e.work, {
                            bits: 5
                        }),
                        U = !1
                    }
                    e.lencode = T,
                    e.lenbits = 9,
                    e.distcode = I,
                    e.distbits = 5
                }
                  , D = (e,t,n,i)=>{
                    let r;
                    const o = e.state;
                    return null === o.window && (o.wsize = 1 << o.wbits,
                    o.wnext = 0,
                    o.whave = 0,
                    o.window = new Uint8Array(o.wsize)),
                    i >= o.wsize ? (o.window.set(t.subarray(n - o.wsize, n), 0),
                    o.wnext = 0,
                    o.whave = o.wsize) : (r = o.wsize - o.wnext,
                    r > i && (r = i),
                    o.window.set(t.subarray(n - i, n - i + r), o.wnext),
                    (i -= r) ? (o.window.set(t.subarray(n - i, n), 0),
                    o.wnext = i,
                    o.whave = o.wsize) : (o.wnext += r,
                    o.wnext === o.wsize && (o.wnext = 0),
                    o.whave < o.wsize && (o.whave += r))),
                    0
                }
                ;
                var B = C
                  , F = Z
                  , N = (e,n)=>{
                    let o, a, s, l, d, E, R, C, S, Z, T, I, U, B, F, N, M, L, $, z, j, H, P = 0;
                    const G = new Uint8Array(4);
                    let K, q;
                    const Y = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
                    if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in)
                        return b;
                    o = e.state,
                    o.mode === p && (o.mode = 13),
                    d = e.next_out,
                    s = e.output,
                    R = e.avail_out,
                    l = e.next_in,
                    a = e.input,
                    E = e.avail_in,
                    C = o.hold,
                    S = o.bits,
                    Z = E,
                    T = R,
                    H = w;
                    e: for (; ; )
                        switch (o.mode) {
                        case 1:
                            if (0 === o.wrap) {
                                o.mode = 13;
                                break
                            }
                            for (; S < 16; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            if (2 & o.wrap && 35615 === C) {
                                o.check = 0,
                                G[0] = 255 & C,
                                G[1] = C >>> 8 & 255,
                                o.check = i(o.check, G, 2, 0),
                                C = 0,
                                S = 0,
                                o.mode = 2;
                                break
                            }
                            if (o.flags = 0,
                            o.head && (o.head.done = !1),
                            !(1 & o.wrap) || (((255 & C) << 8) + (C >> 8)) % 31) {
                                e.msg = "incorrect header check",
                                o.mode = v;
                                break
                            }
                            if ((15 & C) !== y) {
                                e.msg = "unknown compression method",
                                o.mode = v;
                                break
                            }
                            if (C >>>= 4,
                            S -= 4,
                            j = 8 + (15 & C),
                            0 === o.wbits)
                                o.wbits = j;
                            else if (j > o.wbits) {
                                e.msg = "invalid window size",
                                o.mode = v;
                                break
                            }
                            o.dmax = 1 << o.wbits,
                            e.adler = o.check = 1,
                            o.mode = 512 & C ? 10 : p,
                            C = 0,
                            S = 0;
                            break;
                        case 2:
                            for (; S < 16; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            if (o.flags = C,
                            (255 & o.flags) !== y) {
                                e.msg = "unknown compression method",
                                o.mode = v;
                                break
                            }
                            if (57344 & o.flags) {
                                e.msg = "unknown header flags set",
                                o.mode = v;
                                break
                            }
                            o.head && (o.head.text = C >> 8 & 1),
                            512 & o.flags && (G[0] = 255 & C,
                            G[1] = C >>> 8 & 255,
                            o.check = i(o.check, G, 2, 0)),
                            C = 0,
                            S = 0,
                            o.mode = 3;
                        case 3:
                            for (; S < 32; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            o.head && (o.head.time = C),
                            512 & o.flags && (G[0] = 255 & C,
                            G[1] = C >>> 8 & 255,
                            G[2] = C >>> 16 & 255,
                            G[3] = C >>> 24 & 255,
                            o.check = i(o.check, G, 4, 0)),
                            C = 0,
                            S = 0,
                            o.mode = 4;
                        case 4:
                            for (; S < 16; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            o.head && (o.head.xflags = 255 & C,
                            o.head.os = C >> 8),
                            512 & o.flags && (G[0] = 255 & C,
                            G[1] = C >>> 8 & 255,
                            o.check = i(o.check, G, 2, 0)),
                            C = 0,
                            S = 0,
                            o.mode = 5;
                        case 5:
                            if (1024 & o.flags) {
                                for (; S < 16; ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                o.length = C,
                                o.head && (o.head.extra_len = C),
                                512 & o.flags && (G[0] = 255 & C,
                                G[1] = C >>> 8 & 255,
                                o.check = i(o.check, G, 2, 0)),
                                C = 0,
                                S = 0
                            } else
                                o.head && (o.head.extra = null);
                            o.mode = 6;
                        case 6:
                            if (1024 & o.flags && (I = o.length,
                            I > E && (I = E),
                            I && (o.head && (j = o.head.extra_len - o.length,
                            o.head.extra || (o.head.extra = new Uint8Array(o.head.extra_len)),
                            o.head.extra.set(a.subarray(l, l + I), j)),
                            512 & o.flags && (o.check = i(o.check, a, I, l)),
                            E -= I,
                            l += I,
                            o.length -= I),
                            o.length))
                                break e;
                            o.length = 0,
                            o.mode = 7;
                        case 7:
                            if (2048 & o.flags) {
                                if (0 === E)
                                    break e;
                                I = 0;
                                do {
                                    j = a[l + I++],
                                    o.head && j && o.length < 65536 && (o.head.name += String.fromCharCode(j))
                                } while (j && I < E);
                                if (512 & o.flags && (o.check = i(o.check, a, I, l)),
                                E -= I,
                                l += I,
                                j)
                                    break e
                            } else
                                o.head && (o.head.name = null);
                            o.length = 0,
                            o.mode = 8;
                        case 8:
                            if (4096 & o.flags) {
                                if (0 === E)
                                    break e;
                                I = 0;
                                do {
                                    j = a[l + I++],
                                    o.head && j && o.length < 65536 && (o.head.comment += String.fromCharCode(j))
                                } while (j && I < E);
                                if (512 & o.flags && (o.check = i(o.check, a, I, l)),
                                E -= I,
                                l += I,
                                j)
                                    break e
                            } else
                                o.head && (o.head.comment = null);
                            o.mode = 9;
                        case 9:
                            if (512 & o.flags) {
                                for (; S < 16; ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                if (C !== (65535 & o.check)) {
                                    e.msg = "header crc mismatch",
                                    o.mode = v;
                                    break
                                }
                                C = 0,
                                S = 0
                            }
                            o.head && (o.head.hcrc = o.flags >> 9 & 1,
                            o.head.done = !0),
                            e.adler = o.check = 0,
                            o.mode = p;
                            break;
                        case 10:
                            for (; S < 32; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            e.adler = o.check = A(C),
                            C = 0,
                            S = 0,
                            o.mode = 11;
                        case 11:
                            if (0 === o.havedict)
                                return e.next_out = d,
                                e.avail_out = R,
                                e.next_in = l,
                                e.avail_in = E,
                                o.hold = C,
                                o.bits = S,
                                g;
                            e.adler = o.check = 1,
                            o.mode = p;
                        case p:
                            if (n === h || n === u)
                                break e;
                        case 13:
                            if (o.last) {
                                C >>>= 7 & S,
                                S -= 7 & S,
                                o.mode = 27;
                                break
                            }
                            for (; S < 3; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            switch (o.last = 1 & C,
                            C >>>= 1,
                            S -= 1,
                            3 & C) {
                            case 0:
                                o.mode = 14;
                                break;
                            case 1:
                                if (O(o),
                                o.mode = 20,
                                n === u) {
                                    C >>>= 2,
                                    S -= 2;
                                    break e
                                }
                                break;
                            case 2:
                                o.mode = 17;
                                break;
                            case 3:
                                e.msg = "invalid block type",
                                o.mode = v
                            }
                            C >>>= 2,
                            S -= 2;
                            break;
                        case 14:
                            for (C >>>= 7 & S,
                            S -= 7 & S; S < 32; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            if ((65535 & C) != (C >>> 16 ^ 65535)) {
                                e.msg = "invalid stored block lengths",
                                o.mode = v;
                                break
                            }
                            if (o.length = 65535 & C,
                            C = 0,
                            S = 0,
                            o.mode = 15,
                            n === u)
                                break e;
                        case 15:
                            o.mode = 16;
                        case 16:
                            if (I = o.length,
                            I) {
                                if (I > E && (I = E),
                                I > R && (I = R),
                                0 === I)
                                    break e;
                                s.set(a.subarray(l, l + I), d),
                                E -= I,
                                l += I,
                                R -= I,
                                d += I,
                                o.length -= I;
                                break
                            }
                            o.mode = p;
                            break;
                        case 17:
                            for (; S < 14; ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            if (o.nlen = 257 + (31 & C),
                            C >>>= 5,
                            S -= 5,
                            o.ndist = 1 + (31 & C),
                            C >>>= 5,
                            S -= 5,
                            o.ncode = 4 + (15 & C),
                            C >>>= 4,
                            S -= 4,
                            o.nlen > 286 || o.ndist > 30) {
                                e.msg = "too many length or distance symbols",
                                o.mode = v;
                                break
                            }
                            o.have = 0,
                            o.mode = 18;
                        case 18:
                            for (; o.have < o.ncode; ) {
                                for (; S < 3; ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                o.lens[Y[o.have++]] = 7 & C,
                                C >>>= 3,
                                S -= 3
                            }
                            for (; o.have < 19; )
                                o.lens[Y[o.have++]] = 0;
                            if (o.lencode = o.lendyn,
                            o.lenbits = 7,
                            K = {
                                bits: o.lenbits
                            },
                            H = c(0, o.lens, 0, 19, o.lencode, 0, o.work, K),
                            o.lenbits = K.bits,
                            H) {
                                e.msg = "invalid code lengths set",
                                o.mode = v;
                                break
                            }
                            o.have = 0,
                            o.mode = 19;
                        case 19:
                            for (; o.have < o.nlen + o.ndist; ) {
                                for (; P = o.lencode[C & (1 << o.lenbits) - 1],
                                F = P >>> 24,
                                N = P >>> 16 & 255,
                                M = 65535 & P,
                                !(F <= S); ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                if (M < 16)
                                    C >>>= F,
                                    S -= F,
                                    o.lens[o.have++] = M;
                                else {
                                    if (16 === M) {
                                        for (q = F + 2; S < q; ) {
                                            if (0 === E)
                                                break e;
                                            E--,
                                            C += a[l++] << S,
                                            S += 8
                                        }
                                        if (C >>>= F,
                                        S -= F,
                                        0 === o.have) {
                                            e.msg = "invalid bit length repeat",
                                            o.mode = v;
                                            break
                                        }
                                        j = o.lens[o.have - 1],
                                        I = 3 + (3 & C),
                                        C >>>= 2,
                                        S -= 2
                                    } else if (17 === M) {
                                        for (q = F + 3; S < q; ) {
                                            if (0 === E)
                                                break e;
                                            E--,
                                            C += a[l++] << S,
                                            S += 8
                                        }
                                        C >>>= F,
                                        S -= F,
                                        j = 0,
                                        I = 3 + (7 & C),
                                        C >>>= 3,
                                        S -= 3
                                    } else {
                                        for (q = F + 7; S < q; ) {
                                            if (0 === E)
                                                break e;
                                            E--,
                                            C += a[l++] << S,
                                            S += 8
                                        }
                                        C >>>= F,
                                        S -= F,
                                        j = 0,
                                        I = 11 + (127 & C),
                                        C >>>= 7,
                                        S -= 7
                                    }
                                    if (o.have + I > o.nlen + o.ndist) {
                                        e.msg = "invalid bit length repeat",
                                        o.mode = v;
                                        break
                                    }
                                    for (; I--; )
                                        o.lens[o.have++] = j
                                }
                            }
                            if (o.mode === v)
                                break;
                            if (0 === o.lens[256]) {
                                e.msg = "invalid code -- missing end-of-block",
                                o.mode = v;
                                break
                            }
                            if (o.lenbits = 9,
                            K = {
                                bits: o.lenbits
                            },
                            H = c(1, o.lens, 0, o.nlen, o.lencode, 0, o.work, K),
                            o.lenbits = K.bits,
                            H) {
                                e.msg = "invalid literal/lengths set",
                                o.mode = v;
                                break
                            }
                            if (o.distbits = 6,
                            o.distcode = o.distdyn,
                            K = {
                                bits: o.distbits
                            },
                            H = c(2, o.lens, o.nlen, o.ndist, o.distcode, 0, o.work, K),
                            o.distbits = K.bits,
                            H) {
                                e.msg = "invalid distances set",
                                o.mode = v;
                                break
                            }
                            if (o.mode = 20,
                            n === u)
                                break e;
                        case 20:
                            o.mode = 21;
                        case 21:
                            if (E >= 6 && R >= 258) {
                                e.next_out = d,
                                e.avail_out = R,
                                e.next_in = l,
                                e.avail_in = E,
                                o.hold = C,
                                o.bits = S,
                                r(e, T),
                                d = e.next_out,
                                s = e.output,
                                R = e.avail_out,
                                l = e.next_in,
                                a = e.input,
                                E = e.avail_in,
                                C = o.hold,
                                S = o.bits,
                                o.mode === p && (o.back = -1);
                                break
                            }
                            for (o.back = 0; P = o.lencode[C & (1 << o.lenbits) - 1],
                            F = P >>> 24,
                            N = P >>> 16 & 255,
                            M = 65535 & P,
                            !(F <= S); ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            if (N && 0 == (240 & N)) {
                                for (L = F,
                                $ = N,
                                z = M; P = o.lencode[z + ((C & (1 << L + $) - 1) >> L)],
                                F = P >>> 24,
                                N = P >>> 16 & 255,
                                M = 65535 & P,
                                !(L + F <= S); ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                C >>>= L,
                                S -= L,
                                o.back += L
                            }
                            if (C >>>= F,
                            S -= F,
                            o.back += F,
                            o.length = M,
                            0 === N) {
                                o.mode = 26;
                                break
                            }
                            if (32 & N) {
                                o.back = -1,
                                o.mode = p;
                                break
                            }
                            if (64 & N) {
                                e.msg = "invalid literal/length code",
                                o.mode = v;
                                break
                            }
                            o.extra = 15 & N,
                            o.mode = 22;
                        case 22:
                            if (o.extra) {
                                for (q = o.extra; S < q; ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                o.length += C & (1 << o.extra) - 1,
                                C >>>= o.extra,
                                S -= o.extra,
                                o.back += o.extra
                            }
                            o.was = o.length,
                            o.mode = 23;
                        case 23:
                            for (; P = o.distcode[C & (1 << o.distbits) - 1],
                            F = P >>> 24,
                            N = P >>> 16 & 255,
                            M = 65535 & P,
                            !(F <= S); ) {
                                if (0 === E)
                                    break e;
                                E--,
                                C += a[l++] << S,
                                S += 8
                            }
                            if (0 == (240 & N)) {
                                for (L = F,
                                $ = N,
                                z = M; P = o.distcode[z + ((C & (1 << L + $) - 1) >> L)],
                                F = P >>> 24,
                                N = P >>> 16 & 255,
                                M = 65535 & P,
                                !(L + F <= S); ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                C >>>= L,
                                S -= L,
                                o.back += L
                            }
                            if (C >>>= F,
                            S -= F,
                            o.back += F,
                            64 & N) {
                                e.msg = "invalid distance code",
                                o.mode = v;
                                break
                            }
                            o.offset = M,
                            o.extra = 15 & N,
                            o.mode = 24;
                        case 24:
                            if (o.extra) {
                                for (q = o.extra; S < q; ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                o.offset += C & (1 << o.extra) - 1,
                                C >>>= o.extra,
                                S -= o.extra,
                                o.back += o.extra
                            }
                            if (o.offset > o.dmax) {
                                e.msg = "invalid distance too far back",
                                o.mode = v;
                                break
                            }
                            o.mode = 25;
                        case 25:
                            if (0 === R)
                                break e;
                            if (I = T - R,
                            o.offset > I) {
                                if (I = o.offset - I,
                                I > o.whave && o.sane) {
                                    e.msg = "invalid distance too far back",
                                    o.mode = v;
                                    break
                                }
                                I > o.wnext ? (I -= o.wnext,
                                U = o.wsize - I) : U = o.wnext - I,
                                I > o.length && (I = o.length),
                                B = o.window
                            } else
                                B = s,
                                U = d - o.offset,
                                I = o.length;
                            I > R && (I = R),
                            R -= I,
                            o.length -= I;
                            do {
                                s[d++] = B[U++]
                            } while (--I);
                            0 === o.length && (o.mode = 21);
                            break;
                        case 26:
                            if (0 === R)
                                break e;
                            s[d++] = o.length,
                            R--,
                            o.mode = 21;
                            break;
                        case 27:
                            if (o.wrap) {
                                for (; S < 32; ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C |= a[l++] << S,
                                    S += 8
                                }
                                if (T -= R,
                                e.total_out += T,
                                o.total += T,
                                T && (e.adler = o.check = o.flags ? i(o.check, s, T, d - T) : t(o.check, s, T, d - T)),
                                T = R,
                                (o.flags ? C : A(C)) !== o.check) {
                                    e.msg = "incorrect data check",
                                    o.mode = v;
                                    break
                                }
                                C = 0,
                                S = 0
                            }
                            o.mode = 28;
                        case 28:
                            if (o.wrap && o.flags) {
                                for (; S < 32; ) {
                                    if (0 === E)
                                        break e;
                                    E--,
                                    C += a[l++] << S,
                                    S += 8
                                }
                                if (C !== (4294967295 & o.total)) {
                                    e.msg = "incorrect length check",
                                    o.mode = v;
                                    break
                                }
                                C = 0,
                                S = 0
                            }
                            o.mode = 29;
                        case 29:
                            H = m;
                            break e;
                        case v:
                            H = x;
                            break e;
                        case 31:
                            return k;
                        default:
                            return b
                        }
                    return e.next_out = d,
                    e.avail_out = R,
                    e.next_in = l,
                    e.avail_in = E,
                    o.hold = C,
                    o.bits = S,
                    (o.wsize || T !== e.avail_out && o.mode < v && (o.mode < 27 || n !== f)) && D(e, e.output, e.next_out, T - e.avail_out),
                    Z -= e.avail_in,
                    T -= e.avail_out,
                    e.total_in += Z,
                    e.total_out += T,
                    o.total += T,
                    o.wrap && T && (e.adler = o.check = o.flags ? i(o.check, s, T, e.next_out - T) : t(o.check, s, T, e.next_out - T)),
                    e.data_type = o.bits + (o.last ? 64 : 0) + (o.mode === p ? 128 : 0) + (20 === o.mode || 15 === o.mode ? 256 : 0),
                    (0 === Z && 0 === T || n === f) && H === w && (H = _),
                    H
                }
                  , M = e=>{
                    if (!e || !e.state)
                        return b;
                    let t = e.state;
                    return t.window && (t.window = null),
                    e.state = null,
                    w
                }
                  , L = (e,t)=>{
                    if (!e || !e.state)
                        return b;
                    const n = e.state;
                    return 0 == (2 & n.wrap) ? b : (n.head = t,
                    t.done = !1,
                    w)
                }
                  , $ = (e,n)=>{
                    const i = n.length;
                    let r, o, a;
                    return e && e.state ? (r = e.state,
                    0 !== r.wrap && 11 !== r.mode ? b : 11 === r.mode && (o = 1,
                    o = t(o, n, i, 0),
                    o !== r.check) ? x : (a = D(e, n, i, i),
                    a ? (r.mode = 31,
                    k) : (r.havedict = 1,
                    w))) : b
                }
                ;
                const z = (e,t)=>Object.prototype.hasOwnProperty.call(e, t);
                let j = !0;
                try {
                    String.fromCharCode.apply(null, new Uint8Array(1))
                } catch (e) {
                    j = !1
                }
                const H = new Uint8Array(256);
                for (let e = 0; e < 256; e++)
                    H[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
                H[254] = H[254] = 1;
                var P = (e,t)=>{
                    const n = t || e.length;
                    if ("function" == typeof TextDecoder && TextDecoder.prototype.decode)
                        return (new TextDecoder).decode(e.subarray(0, t));
                    let i, r;
                    const o = new Array(2 * n);
                    for (r = 0,
                    i = 0; i < n; ) {
                        let t = e[i++];
                        if (t < 128) {
                            o[r++] = t;
                            continue
                        }
                        let a = H[t];
                        if (a > 4)
                            o[r++] = 65533,
                            i += a - 1;
                        else {
                            for (t &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && i < n; )
                                t = t << 6 | 63 & e[i++],
                                a--;
                            a > 1 ? o[r++] = 65533 : t < 65536 ? o[r++] = t : (t -= 65536,
                            o[r++] = 55296 | t >> 10 & 1023,
                            o[r++] = 56320 | 1023 & t)
                        }
                    }
                    return ((e,t)=>{
                        if (t < 65534 && e.subarray && j)
                            return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
                        let n = "";
                        for (let i = 0; i < t; i++)
                            n += String.fromCharCode(e[i]);
                        return n
                    }
                    )(o, r)
                }
                  , G = (e,t)=>{
                    (t = t || e.length) > e.length && (t = e.length);
                    let n = t - 1;
                    for (; n >= 0 && 128 == (192 & e[n]); )
                        n--;
                    return n < 0 || 0 === n ? t : n + H[e[n]] > t ? n : t
                }
                  , K = {
                    2: "need dictionary",
                    1: "stream end",
                    0: "",
                    "-1": "file error",
                    "-2": "stream error",
                    "-3": "data error",
                    "-4": "insufficient memory",
                    "-5": "buffer error",
                    "-6": "incompatible version"
                }
                  , q = function() {
                    this.input = null,
                    this.next_in = 0,
                    this.avail_in = 0,
                    this.total_in = 0,
                    this.output = null,
                    this.next_out = 0,
                    this.avail_out = 0,
                    this.total_out = 0,
                    this.msg = "",
                    this.state = null,
                    this.data_type = 2,
                    this.adler = 0
                }
                  , Y = function() {
                    this.text = 0,
                    this.time = 0,
                    this.xflags = 0,
                    this.os = 0,
                    this.extra = null,
                    this.extra_len = 0,
                    this.name = "",
                    this.comment = "",
                    this.hcrc = 0,
                    this.done = !1
                };
                const J = Object.prototype.toString
                  , {Z_NO_FLUSH: V, Z_FINISH: W, Z_OK: X, Z_STREAM_END: Q, Z_NEED_DICT: ee, Z_STREAM_ERROR: te, Z_DATA_ERROR: ne, Z_MEM_ERROR: ie} = d;
                function re(e) {
                    this.options = function(e) {
                        const t = Array.prototype.slice.call(arguments, 1);
                        for (; t.length; ) {
                            const n = t.shift();
                            if (n) {
                                if ("object" != typeof n)
                                    throw new TypeError(n + "must be non-object");
                                for (const t in n)
                                    z(n, t) && (e[t] = n[t])
                            }
                        }
                        return e
                    }({
                        chunkSize: 65536,
                        windowBits: 15,
                        to: ""
                    }, e || {});
                    const t = this.options;
                    t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits,
                    0 === t.windowBits && (t.windowBits = -15)),
                    !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
                    t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new q,
                    this.strm.avail_out = 0;
                    let n = F(this.strm, t.windowBits);
                    if (n !== X)
                        throw new Error(K[n]);
                    if (this.header = new Y,
                    L(this.strm, this.header),
                    t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = (e=>{
                        if ("function" == typeof TextEncoder && TextEncoder.prototype.encode)
                            return (new TextEncoder).encode(e);
                        let t, n, i, r, o, a = e.length, s = 0;
                        for (r = 0; r < a; r++)
                            n = e.charCodeAt(r),
                            55296 == (64512 & n) && r + 1 < a && (i = e.charCodeAt(r + 1),
                            56320 == (64512 & i) && (n = 65536 + (n - 55296 << 10) + (i - 56320),
                            r++)),
                            s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                        for (t = new Uint8Array(s),
                        o = 0,
                        r = 0; o < s; r++)
                            n = e.charCodeAt(r),
                            55296 == (64512 & n) && r + 1 < a && (i = e.charCodeAt(r + 1),
                            56320 == (64512 & i) && (n = 65536 + (n - 55296 << 10) + (i - 56320),
                            r++)),
                            n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6,
                            t[o++] = 128 | 63 & n) : n < 65536 ? (t[o++] = 224 | n >>> 12,
                            t[o++] = 128 | n >>> 6 & 63,
                            t[o++] = 128 | 63 & n) : (t[o++] = 240 | n >>> 18,
                            t[o++] = 128 | n >>> 12 & 63,
                            t[o++] = 128 | n >>> 6 & 63,
                            t[o++] = 128 | 63 & n);
                        return t
                    }
                    )(t.dictionary) : "[object ArrayBuffer]" === J.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
                    t.raw && (n = $(this.strm, t.dictionary),
                    n !== X)))
                        throw new Error(K[n])
                }
                function oe(e, t) {
                    const n = new re(t);
                    if (n.push(e),
                    n.err)
                        throw n.msg || K[n.err];
                    return n.result
                }
                re.prototype.push = function(e, t) {
                    const n = this.strm
                      , i = this.options.chunkSize
                      , r = this.options.dictionary;
                    let o, a, s;
                    if (this.ended)
                        return !1;
                    for (a = t === ~~t ? t : !0 === t ? W : V,
                    "[object ArrayBuffer]" === J.call(e) ? n.input = new Uint8Array(e) : n.input = e,
                    n.next_in = 0,
                    n.avail_in = n.input.length; ; ) {
                        for (0 === n.avail_out && (n.output = new Uint8Array(i),
                        n.next_out = 0,
                        n.avail_out = i),
                        o = N(n, a),
                        o === ee && r && (o = $(n, r),
                        o === X ? o = N(n, a) : o === ne && (o = ee)); n.avail_in > 0 && o === Q && n.state.wrap > 0 && 0 !== e[n.next_in]; )
                            B(n),
                            o = N(n, a);
                        switch (o) {
                        case te:
                        case ne:
                        case ee:
                        case ie:
                            return this.onEnd(o),
                            this.ended = !0,
                            !1
                        }
                        if (s = n.avail_out,
                        n.next_out && (0 === n.avail_out || o === Q))
                            if ("string" === this.options.to) {
                                let e = G(n.output, n.next_out)
                                  , t = n.next_out - e
                                  , r = P(n.output, e);
                                n.next_out = t,
                                n.avail_out = i - t,
                                t && n.output.set(n.output.subarray(e, e + t), 0),
                                this.onData(r)
                            } else
                                this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
                        if (o !== X || 0 !== s) {
                            if (o === Q)
                                return o = M(this.strm),
                                this.onEnd(o),
                                this.ended = !0,
                                !0;
                            if (0 === n.avail_in)
                                break
                        }
                    }
                    return !0
                }
                ,
                re.prototype.onData = function(e) {
                    this.chunks.push(e)
                }
                ,
                re.prototype.onEnd = function(e) {
                    e === X && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = (e=>{
                        let t = 0;
                        for (let n = 0, i = e.length; n < i; n++)
                            t += e[n].length;
                        const n = new Uint8Array(t);
                        for (let t = 0, i = 0, r = e.length; t < r; t++) {
                            let r = e[t];
                            n.set(r, i),
                            i += r.length
                        }
                        return n
                    }
                    )(this.chunks)),
                    this.chunks = [],
                    this.err = e,
                    this.msg = this.strm.msg
                }
                ;
                var ae = re
                  , se = oe
                  , le = function(e, t) {
                    return (t = t || {}).raw = !0,
                    oe(e, t)
                }
                  , ce = oe
                  , de = d
                  , fe = {
                    Inflate: ae,
                    inflate: se,
                    inflateRaw: le,
                    ungzip: ce,
                    constants: de
                };
                e.Inflate = ae,
                e.constants = de,
                e.default = fe,
                e.inflate = se,
                e.inflateRaw = le,
                e.ungzip = ce,
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }(t)
        }
    }
      , t = {};
    function n(i) {
        var r = t[i];
        if (void 0 !== r)
            return r.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, n),
        o.exports
    }
    (()=>{
        "use strict";
        var e = n(745);
        function t(e) {
            let t, n, i, r, o = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756], a = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344], s = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584], l = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928], c = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080], d = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312], f = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154], h = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696], u = [134873602, 134228224, 16789505, 604700676, 83894272, 67702788, 84148236, 331780, 67436808, 331778, 337707305, 266240, 270606632, 537264160, 268501296, 604635172, 656384, 169878272, 34079744, 136323081, 34605056, 3154952, 34603008, 288367640, 704643584, 286262792, 671221248, 303041536, 134873602, 436209664, 287318033, 537526278], w = atob(e), m = w.length, g = [30, -2, -2], b = 8 - m % 8, x = 0, k = 1342195456, _ = 1375752960, y = "";
            for (w += String.fromCharCode(b).repeat(b); x < m; ) {
                i = k,
                r = _,
                k = t = w.charCodeAt(x++) << 24 | w.charCodeAt(x++) << 16 | w.charCodeAt(x++) << 8 | w.charCodeAt(x++),
                _ = n = w.charCodeAt(x++) << 24 | w.charCodeAt(x++) << 16 | w.charCodeAt(x++) << 8 | w.charCodeAt(x++),
                t ^= (b = 252645135 & (t >>> 4 ^ n)) << 4,
                t ^= (b = 65535 & (t >>> 16 ^ (n ^= b))) << 16,
                t ^= b = 858993459 & ((n ^= b) >>> 2 ^ t),
                t ^= b = 16711935 & ((n ^= b << 2) >>> 8 ^ t),
                t = (t ^= (b = 1431655765 & (t >>> 1 ^ (n ^= b << 8))) << 1) << 1 | t >>> 31,
                n = (n ^= b) << 1 | n >>> 31;
                for (let e = g[0]; e != g[1]; e += g[2]) {
                    let i = n ^ u[e]
                      , r = (n >>> 4 | n << 28) ^ u[e + 1];
                    b = t,
                    t = n,
                    n = b ^ (a[i >>> 24 & 63] | l[i >>> 16 & 63] | d[i >>> 8 & 63] | h[63 & i] | o[r >>> 24 & 63] | s[r >>> 16 & 63] | c[r >>> 8 & 63] | f[63 & r])
                }
                b = t,
                t = n,
                n = (n = b) >>> 1 | n << 31,
                n ^= b = 1431655765 & ((t = t >>> 1 | t << 31) >>> 1 ^ n),
                n ^= (b = 16711935 & (n >>> 8 ^ (t ^= b << 1))) << 8,
                n ^= (b = 858993459 & (n >>> 2 ^ (t ^= b))) << 2,
                n ^= b = 65535 & ((t ^= b) >>> 16 ^ n),
                n ^= b = 252645135 & ((t ^= b << 16) >>> 4 ^ n),
                t ^= b << 4,
                t ^= i,
                n ^= r,
                y += String.fromCharCode(t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t, n >>> 24, n >>> 16 & 255, n >>> 8 & 255, 255 & n)
            }
            return function(e) {
                let t = "";
                for (let n = 0; n < e.length; n += 2) {
                    let i = e.charCodeAt(n)
                      , r = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r << 8) + i)
                }
                return t
            }(y.slice(0, -y.charCodeAt(y.length - 1)))
        }
        function i(e) {
            let t = Array.from(new Array(256), ((e,t)=>128 & t ? t << 1 & 255 ^ 27 : t << 1))
              , n = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125]
              , i = [98, 127, 241, 148, 33, 133, 224, 17, 200, 21, 232, 30, 99, 155, 154, 0, 0, 28, 118, 107, 130, 108, 41, 189, 150, 87, 133, 137, 241, 154, 111, 214, 219, 215, 7, 53, 250, 82, 231, 36, 50, 71, 15, 58, 81, 220, 149, 58, 209, 154, 92, 235, 83, 246, 117, 86, 197, 161, 240, 223, 52, 59, 159, 9, 59, 12, 6, 45, 193, 94, 225, 9, 243, 25, 238, 51, 162, 197, 123, 9, 235, 60, 125, 234, 184, 202, 8, 188, 125, 107, 248, 99, 73, 80, 103, 106, 108, 137, 4, 22, 173, 215, 229, 31, 94, 206, 11, 44, 252, 11, 112, 37, 91, 23, 44, 213, 227, 221, 36, 105, 158, 182, 220, 10, 215, 230, 187, 96, 234, 99, 212, 24, 71, 180, 49, 7, 25, 122, 58, 43, 229, 113, 74, 14, 130, 180, 250, 126, 97, 105, 222, 23, 255, 223, 2, 29, 40, 57, 185, 125, 232, 53, 43, 44, 175, 129, 26, 43, 182, 251, 32, 0, 83, 138, 106, 14, 111, 202, 248, 213, 14, 163, 38, 194, 241, 124, 36, 223, 217, 69, 157, 162, 166, 107, 17, 25, 9, 234, 11, 50, 191, 17, 43, 50, 236, 155, 65, 60, 161, 222, 123, 62, 175, 125, 93, 252, 94, 1, 121, 35, 135, 68, 228, 129, 253, 2, 29, 14, 244, 232, 22, 60, 75, 249, 61, 14, 167, 98, 124, 50]
              , r = [190, 86, 22, 127, 131, 218, 59, 239, 239, 248, 24, 97, 165, 197, 243, 205]
              , o = atob(e).split("").map((e=>e.charCodeAt()));
            return (new TextDecoder).decode(Uint8Array.from(function(e) {
                let o = e.slice()
                  , a = o.length
                  , s = r;
                for (let e = 0; e < a; e += 16) {
                    let t = o.slice(e, e + 16);
                    d(t, i.slice(224, 240)),
                    c(t),
                    l(t);
                    for (let e = 208; e >= 16; e -= 16)
                        d(t, i.slice(e, e + 16)),
                        f(t),
                        c(t),
                        l(t);
                    d(t, i.slice(0, 16));
                    for (let e = 0; e < 16; e++)
                        t[e] ^= s[e];
                    for (let t = 0; t < 16; t++)
                        s[t] = o[e + t];
                    for (let n = 0; n < 16; n++)
                        o[e + n] = t[n]
                }
                return o.slice(0, -o[o.length - 1]);
                function l(e) {
                    for (let t = 0; t < 16; t++)
                        e[t] = n[e[t]]
                }
                function c(e) {
                    let t = Array.from(new Array(16), ((e,t)=>13 * t & 15))
                      , n = e.slice();
                    for (let i = 0; i < 16; i++)
                        e[i] = n[t[i]]
                }
                function d(e, t) {
                    for (let n = 0; n < 16; n++)
                        e[n] ^= t[n]
                }
                function f(e) {
                    for (let n = 0; n < 16; n += 4) {
                        let i = e[n + 0]
                          , r = e[n + 1]
                          , o = e[n + 2]
                          , a = e[n + 3]
                          , s = i ^ r ^ o ^ a
                          , l = t[s]
                          , c = t[t[l ^ i ^ o]] ^ s
                          , d = t[t[l ^ r ^ a]] ^ s;
                        e[n + 0] ^= c ^ t[i ^ r],
                        e[n + 1] ^= d ^ t[r ^ o],
                        e[n + 2] ^= c ^ t[o ^ a],
                        e[n + 3] ^= d ^ t[a ^ i]
                    }
                }
            }(o)))
        }
        
        // 版本
        self._i = ["rks查询工具·改", [1, 1, 0], 1655595109, 0];
        function o(e) {
            const n = (new DOMParser).parseFromString(e, "text/xml").querySelectorAll("map>string");
            if (!n.length)
                throw new Error("文件格式错误");
            let r = {};
            for (const e of n)
                try {
                    const n = t(decodeURIComponent(e.getAttribute("name")))
                      , i = t(decodeURIComponent(e.textContent));
                    /.*\.Record\..*/.test(n) ? r[n] = JSON.parse(i) : ("ChallengeModeRank" == n || "playerID" == n) && (r[n] = i)
                } catch (e) {}
            for (const e of n)
                try {
                    const t = i(decodeURIComponent(e.getAttribute("name")))
                      , n = i(decodeURIComponent(e.textContent));
                    /.*\.Record\..*/.test(t) ? r[t] = JSON.parse(n) : ("ChallengeModeRank" == t || "playerID" == t) && (r[t] = n)
                } catch (e) {}
            return r
        }

        // 上传文件
        document.getElementById("upload").addEventListener("change", (function() {
            const t = this.files[0];
            t && function(t) {
                const n = new FileReader;
                n.onprogress = e=>{
                    const n = t.size;
                    //console.log(`加载文件：${Math.floor(e.loaded / n * 100)}%`)
                }
                ,
                n.onload = async function() {
                    try {
                        var t = o((new TextDecoder).decode(n.result))
                    } catch (n) {
                        const i = await async function(t) {
                            const n = new Uint8Array(t)
                              , i = new TextDecoder;
                            let r = 0;
                            console.log(n),
                            window.data = n;
                            const o = f();
                            console.log("Magic: " + o);
                            const a = 0 | f();
                            if (console.log("Version: " + a),
                            a < 1 || a > 5)
                                throw new Error("Unsupported backup version: " + a);
                            const s = 1 == (0 | f());
                            console.log("Compressed: " + s);
                            const l = f();
                            console.log("Encryption Algorithm: " + l);
                            const c = n.slice(r)
                              , d = s ? await (0,
                            e.inflate)(c) : c;
                            function f() {
                                const e = r;
                                if (r = n.indexOf(10, r),
                                -1 == r)
                                    throw new Error("Invalid backup file.");
                                return i.decode(n.slice(e, ++r))
                            }
                            return function() {
                                const e = /\.v2\.playerprefs\.xml$/;
                                let t = 0;
                                for (; t < d.length; ) {
                                    const n = i.decode(d.slice(t, t + 100)).replace(/\0.*$/, "")
                                      , r = parseInt(i.decode(d.slice(t + 124, t + 124 + 12)), 8);
                                    if (e.test(n))
                                        return i.decode(d.slice(t + 512, t + 512 + r));
                                    t = t + 512 + 512 * Math.ceil(r / 512)
                                }
                                throw new Error("Cannot find phigros data.")
                            }()
                        }(this.result);
                        t = o(i)
                    }
                    await async function(e) {
                        const t = await fetch("./song.json").then((e=>e.json()))
                          , n = document.createElement("canvas").getContext("2d");
                        n.font = "36px Saira";
                        const i = e=>n.measureText(e).width;
                        const o = [{
                            level: "",
                            difficulty: 0,
                            acc: 100,
                            rating: 0
                        }];
                        //console.log(e);
                        for (const n of t)
                            for (const t in n.difficulty) {
                                const i = e[n.songsId + ".Record." + t]
                                  , r = n.songsId
                                  , a = n.songsName
                                  , s = n.difficulty[t]
                                  , l = i ? i.s : 0
                                  , c = i ? i.a : 0
                                  , d = i ? i.c : 0
                                  , f = c > 70 ? ((c - 55) / 45) ** 2 * s : 0;
                                s % 1 && o.push({
                                    songsId: r,
                                    songsName: a,
                                    level: t,
                                    difficulty: s,
                                    score: l,
                                    acc: c,
                                    combo: d,
                                    rating: f
                                })
                            }
                        o.sort(((e,t)=>t.rating - e.rating || t.difficulty - e.difficulty)),
                        o.unshift(o.filter((e=>100 == e.acc))[0]);
                        const a = o.slice(0, 20).reduce(((e,t)=>e + 5 * t.rating), 0)
                          , s = ((a + .5 | 0) - a + .5) / 5
                          , l = o[0].rating
                          , c = o[19].rating + s
                          , d = document.createElement("span")
                          , f = null == e.playerID ? '<a style="color:red">GUEST</a>' : String(e.playerID).replace(/&/g, "&amp;").replace(/</g, "&lt;");
                        d.innerHTML = `Username: ${f}    RankingScore: ${(a / 100).toFixed(4)}`,
                        d.classList.add("bi"),
                        document.getElementById("container").append(d, document.createElement("br"));
                        if(e.ChallengeModeRank){
                            const challengeColor=e.ChallengeModeRank[0],challengeLvl=e.ChallengeModeRank.substring(1);
                            var ch;
                            switch(challengeColor){
                                case "5":
                                    ch=`<span title class="rainbow">${challengeLvl}</span>`;
                                    break;
                                case "4":
                                    ch=`<span class="gold">${challengeLvl}</span>`;
                                    break;
                                case "3":
                                    ch=`<span class="orange">${challengeLvl}</span>`;
                                    break;
                                case "2":
                                    ch=`<span class="blue">${challengeLvl}</span>`;
                                    break;
                                case "1":
                                    ch=`<span class="green">${challengeLvl}</span>`;
                                    break;
                            }
                            d.innerHTML+=`\nChallengeModeRank: ${ch}`;
                        }
                        d.innerHTML+='\n背景颜色说明: <span class="sb">继续推分</span> <span class="sg">需要收歌才能涨rks</span> <span class="sr">怎么推都没用</span>'
                        o.forEach(((e,t)=>{
                            if(t > 19 && document.getElementById("b19").checked) return;
                            const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            n.classList.add("svg"),
                            n.style.cssText += `;width:calc(${100 / r}% - 6px);`,
                            n.setAttribute("viewBox", "0 0 512 240");
                            const o = ((t < 19 ? e.rating + s : c) / e.difficulty) ** .5 * 45 + 55
                              , a = o < 70 ? 70 : o < 100 ? o : l < e.difficulty ? 100 : o;
                            n.classList.add(a < 100 ? "sb" : l < e.difficulty ? "sg" : "sr");
                            const d = e.songsName
                              , f = `#${t || "φ"}`;
                            if (d)
                                n.innerHTML = `<g fill="#000"stroke="none"dosairant-baseline="middle"text-anchor="start"class="tg"><text x="32"y="64"${i(d) > 384 ? 'textlength="384"' : ""}lengthAdjust="spacingAndGlyphs"class="snb">${d}</text><text x="480"y="64"${i(f) > 64 ? 'textlength="64"' : ""}lengthAdjust="spacingAndGlyphs"class="rk">${f}</text><text x="32"y="112">${e.level} ${e.difficulty.toFixed(1)}(rks: ${e.rating.toFixed(4)})</text><text x="480"y="112"text-anchor="end">acc: ${e.acc.toFixed(4)}%</text>` + (a <= 100 ? `<text x="32"y="228"fill="#aaa">推分最小acc: ${a.toFixed(4)}%</text>` : "") + `<text x="32"y="184"lengthAdjust="spacingAndGlyphs"textlength="336"font-size="80">${("0000000" + e.score).slice(-7)}</text>` + ((e,c)=>e >= 1e6 ? '<text x="440"y="174"class="rc r0">φ</text>' : c == 1 ? '<text x="440"y="184"class="rc r1">V</text>' : e >= 96e4 ? '<text x="440"y="184"class="rc v">V</text>' : e >= 92e4 ? '<text x="440"y="184"class="rc r2">S</text>' : e >= 88e4 ? '<text x="440"y="184"class="rc r3">A</text>' : e >= 82e4 ? '<text x="440"y="184"class="rc r4">B</text>' : e >= 7e5 ? '<text x="440"y="184"class="rc r5">C</text>' : '<text x="440"y="184"class="rc r6">F</text>')(e.score, e.combo) + "</g>";
                            else {
                                if (0 != t)
                                    return;
                                n.innerHTML = `<g fill="#000"stroke="none"dosairant-baseline="middle"text-anchor="start"class="tg"><text x="32"y="64"${i(d) > 384 ? 'textlength="384"' : ""}lengthAdjust="spacingAndGlyphs"class="snr">无满分记录</text><text x="480"y="64"${i(f) > 64 ? 'textlength="64"' : ""}lengthAdjust="spacingAndGlyphs"class="rk">${f}</text><text x="32"y="112">${e.level} ${e.difficulty.toFixed(1)}(rks: ${e.rating.toFixed(4)})</text><text x="480"y="112"text-anchor="end">acc: ${e.acc.toFixed(4)}%</text></g>`
                            }
                            document.getElementById("container").appendChild(n)
                        }
                        )),
                        o
                    }(t),
                    document.getElementById("config").style.display = ""
                }
                ,
                n.readAsArrayBuffer(t)
            }(t)
        }))
        document.getElementById("colp").addEventListener("click", (()=>{
            r++;
            for (const e of document.querySelectorAll("svg"))
                e.style.cssText += `;width:calc(${100 / r}% - 6px);`
        })),
        document.getElementById("colm").addEventListener("click", (()=>{
            if (r > 1) {
                r--;
                for (const e of document.querySelectorAll("svg"))
                    e.style.cssText += `;width:calc(${100 / r}% - 6px);`
            }
        }))
    }
    )()
}
)();
var $ = (i) => document.getElementById(i);
function getByToken(){
    MyUtil.createPopupBox('查询中，请耐心等待……', close=3);
    var token = $('token').value;
    async function main(){
        let pyodide = await loadPyodide();
        await pyodide.loadPackage(['requests', 'pycryptodome'], options={'checkIntegrity': false});
        let zipResponse = await fetch("taptap/file.zip");
        let zipBinary = await zipResponse.arrayBuffer();
        pyodide.unpackArchive(zipBinary, "zip");
        let response = await fetch("taptap/code.zip"); // .zip, .whl, ...
        let buffer = await response.arrayBuffer();
        await pyodide.unpackArchive(buffer, "zip"); // by default, unpacks to the current dir
        pyodide.pyimport("method");
        var out = await pyodide.runPythonAsync(`
            import method
            token = '${token}'
            [method.summary(token), method.b19(token)]
        `);
        out = out.toJs();
        var summary = out[0], b19 = out[1];
        console.log(summary, b19)
        var o = b19[0];
        var a = o.slice(0, 20).reduce(((e,t)=>e + 5 * t.get('rks')), 0)
        , s = ((a + .5 | 0) - a + .5) / 5
        , l = o[0].get('rks')
        , c = o[19].get('rks') + s,
        d = document.createElement('span');
        var n = document.createElement("canvas").getContext("2d")
        const i = e=>n.measureText(e).width;
        d.innerHTML = `RankingScore: ${summary.get('rks').toFixed(4)}`;
        d.classList.add("bi");
        document.getElementById("container").append(d, document.createElement("br"));
        var challenge = summary.get('challenge');
        if(challenge){
            challenge = '' + challenge;
            const challengeColor=challenge[0],challengeLvl=challenge.substring(1);
            var ch;
            switch(challengeColor){
                case "5":
                    ch=`<span title class="rainbow">${challengeLvl}</span>`;
                    break;
                case "4":
                    ch=`<span class="gold">${challengeLvl}</span>`;
                    break;
                case "3":
                    ch=`<span class="orange">${challengeLvl}</span>`;
                    break;
                case "2":
                    ch=`<span class="blue">${challengeLvl}</span>`;
                    break;
                case "1":
                    ch=`<span class="green">${challengeLvl}</span>`;
                    break;
            }
            d.innerHTML+=`\nChallengeModeRank: ${ch}`;
            d.innerHTML += `\nUpdate Time: ${summary.get('updateAt').replace('T', ' ').replace('Z', ' ')}`;
            d.innerHTML += `\nAvatar: ${summary.get('avatar')}`;
            d.innerHTML+='\n背景颜色说明: <span class="sb">继续推分</span> <span class="sg">需要收歌才能涨rks</span> <span class="sr">怎么推都没用</span>'
            o.forEach((e,t)=>{
                var idx = t;
                if(t == 0 && !b19[1]){
                    idx++;
                }else{
                    const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    n.classList.add("svg"),
                    n.style.cssText += `;width:calc(${100 / r}% - 6px);`,
                    n.setAttribute("viewBox", "0 0 512 240");
                    const o = ((e.get('rks') + s) / e.get('difficulty')) ** .5 * 45 + 55
                    , a = o < 70 ? 70 : o < 100 ? o : l < e.get('difficulty') ? 100 : o;
                    n.classList.add(a < 100 ? "sb" : l < e.get('difficulty') ? "sg" : "sr");
                    const d = e.get('songname'), f = `#${idx || "φ"}`;
                    if (d)
                        n.innerHTML = `<g fill="#000"stroke="none"dosairant-baseline="middle"text-anchor="start"class="tg"><text x="32"y="64"${i(d) > 384 ? 'textlength="384"' : ""}lengthAdjust="spacingAndGlyphs"class="snb">${d}</text><text x="480"y="64"${i(f) > 64 ? 'textlength="64"' : ""}lengthAdjust="spacingAndGlyphs"class="rk">${f}</text><text x="32"y="112">${e.get('level')} ${e.get('difficulty').toFixed(1)}(rks: ${e.get('rks').toFixed(4)})</text><text x="480"y="112"text-anchor="end">acc: ${e.get('acc').toFixed(4)}%</text>` + (a <= 100 ? `<text x="32"y="228"fill="#aaa">推分最小acc: ${a.toFixed(4)}%</text>` : "") + `<text x="32"y="184"lengthAdjust="spacingAndGlyphs"textlength="336"font-size="80">${("0000000" + e.get('score')).slice(-7)}</text>` + ((e,c)=>e >= 1e6 ? '<text x="440"y="174"class="rc r0">φ</text>' : c == 1 ? '<text x="440"y="184"class="rc r1">V</text>' : e >= 96e4 ? '<text x="440"y="184"class="rc v">V</text>' : e >= 92e4 ? '<text x="440"y="184"class="rc r2">S</text>' : e >= 88e4 ? '<text x="440"y="184"class="rc r3">A</text>' : e >= 82e4 ? '<text x="440"y="184"class="rc r4">B</text>' : e >= 7e5 ? '<text x="440"y="184"class="rc r5">C</text>' : '<text x="440"y="184"class="rc r6">F</text>')(e.get('score'), e.get('fc')) + "</g>";
                    else {
                        if (0 != t)
                            return;
                        n.innerHTML = `<g fill="#000"stroke="none"dosairant-baseline="middle"text-anchor="start"class="tg"><text x="32"y="64"${i(d) > 384 ? 'textlength="384"' : ""}lengthAdjust="spacingAndGlyphs"class="snr">无满分记录</text><text x="480"y="64"${i(f) > 64 ? 'textlength="64"' : ""}lengthAdjust="spacingAndGlyphs"class="rk">${f}</text><text x="32"y="112">${e.get('level')} ${e.get('difficulty').toFixed(1)}(rks: ${e.get('rks').toFixed(4)})</text><text x="480"y="112"text-anchor="end">acc: ${e.get('acc').toFixed(4)}%</text></g>`
                    }
                    document.getElementById("container").appendChild(n)
                }
            });
            document.getElementById("config").style.display = ""
        }
    }
    main();
}